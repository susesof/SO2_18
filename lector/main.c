#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <mysql/mysql.h>
#include <time.h>

#define QUERY_SIZE 1024

void finish_with_error(MYSQL *con) {
    fprintf(stderr, "%s\n", mysql_error(con));
    mysql_close(con);
    exit(1);
}

void convert_time(const char *timestamp_str, char *buffer, size_t buffer_size) {
    long long microseconds = atoll(timestamp_str);
    time_t seconds = microseconds / 1000000;
    struct tm *tm_time = localtime(&seconds);
    strftime(buffer, buffer_size, "%Y-%m-%d %H:%M:%S", tm_time);
}

unsigned long long get_total_virtual_memory() {
    FILE *fp = fopen("/proc/meminfo", "r");
    if (!fp) {
        perror("Failed to open /proc/meminfo");
        return 0;
    }

    char buffer[256];
    unsigned long long memTotal = 0;

    while (fgets(buffer, sizeof(buffer), fp)) {
        if (sscanf(buffer, "MemTotal: %llu kB", &memTotal) == 1) {
            fclose(fp);
            return memTotal * 1024;  // Convert kB to bytes
        }
    }

    fclose(fp);
    return 0;
}

double calculate_memory_usage_percent(unsigned long long used_memory, unsigned long long total_memory) {
    if (total_memory == 0) return 0.0;
    return (double)used_memory / total_memory * 100.0;
}

int main() {
    FILE *fp;
    MYSQL *con = mysql_init(NULL);
    if (con == NULL) {
        fprintf(stderr, "mysql_init() failed\n");
        exit(1);
    }

    if (mysql_real_connect(con, "", "root", "", "proyecto2", 0, NULL, 0) == NULL) {
        finish_with_error(con);
    }

    fp = popen("sudo stap trace.stp", "r");
    if (fp == NULL) {
        fprintf(stderr, "Failed to run command\n");
        exit(1);
    }

    char buffer[1024];
    int last_pid = -1, current_pid;
    char last_type[50] = "", current_type[50];
    char last_process_name[256] = "", last_timestamp[256] = "";
    long long total_length = 0;

    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        int pid;
        char process_name[256] = {0};
        char call_type[50];
        char timestamp[256];
        long long segment_size;

        if (sscanf(buffer, "%[^:]: PID=%d, process=%[^,], time=%[^,], length=%lld",
           call_type, &pid, process_name, timestamp, &segment_size) == 5) {
            current_pid = pid;
            strcpy(current_type, call_type);

            if ((last_pid != -1 && (current_pid != last_pid || strcmp(last_type, current_type) != 0))) {
                char time_str[80];
                convert_time(last_timestamp, time_str, sizeof(time_str));
                double segment_size_mb = total_length / 1048576.0;
                double percent = calculate_memory_usage_percent(total_length, get_total_virtual_memory());

                char query[QUERY_SIZE];
                snprintf(query, QUERY_SIZE, "INSERT INTO MemoryCalls(pid, process_name, call_type, segment_size, percent, timestamp) VALUES(%d, '%s', '%s', %.2f,  %.4f, '%s')",
                        last_pid, last_process_name, last_type, segment_size_mb, percent, time_str);
                if (mysql_query(con, query)) {
                    finish_with_error(con);
                }

                total_length = 0;
            }

            total_length += segment_size;
            last_pid = current_pid;
            strcpy(last_type, current_type);
            strcpy(last_process_name, process_name);
            strcpy(last_timestamp, timestamp);
        }
    }

    pclose(fp);
    mysql_close(con);
    return 0;
}
