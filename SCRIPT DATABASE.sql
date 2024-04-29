USE proyecto2;

CREATE TABLE MemoryCalls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pid INT,
    process_name VARCHAR(255),
    call_type VARCHAR(50),
    segment_size DOUBLE,
    timestamp VARCHAR(255)
);

ALTER TABLE MemoryCalls ADD COLUMN percent double AFTER segment_size;

SELECT * FROM MemoryCalls mc;
SELECT * FROM MemoryCalls mc order by id desc;
SELECT COUNT(*) FROM MemoryCalls mc;




