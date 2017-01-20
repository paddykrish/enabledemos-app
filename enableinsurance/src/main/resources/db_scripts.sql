CREATE DATABASE IF NOT EXISTS enableins_stag;
CREATE DATABASE IF NOT EXISTS enableins;
USE enableins_stag;
DROP TABLE IF EXISTS enableins_stag.insurance_locations;
DROP TABLE IF EXISTS enableins.insurance_locations;
DROP TABLE IF EXISTS enableins_stag.insurance_riskfactors;
DROP TABLE IF EXISTS enableins.insurance_riskfactors;
CREATE TABLE enableins_stag.insurance_locations ( StoreID STRING,  CompanyCode STRING,  Company STRING,
StoreName STRING,  Address STRING, City STRING, Zipcode STRING, County STRING, StoreType STRING )
ROW FORMAT DELIMITED FIELDS TERMINATED BY ',' ;
--hadoop fs -put insurance_locations.csv /tmp/
LOAD DATA INPATH '/tmp/insurance_locations.csv' OVERWRITE INTO TABLE enableins_stag.insurance_locations;
CREATE TABLE enableins.insurance_locations
ROW FORMAT DELIMITED FIELDS TERMINATED BY ','
STORED AS PARQUET AS select * from enableins_stag.insurance_locations;
CREATE TABLE enableins_stag.insurance_riskfactors ( Type STRING,  Value STRING,  Fire DECIMAL,
Crime DECIMAL,  Hail DECIMAL, Earthquake DECIMAL, Windstorm DECIMAL, Flood DECIMAL)
ROW FORMAT DELIMITED FIELDS TERMINATED BY ',' ;
--hadoop fs -put insurance_riskfactors.csv /user/root/tmp/
LOAD DATA INPATH '/tmp/insurance_riskfactors.csv' OVERWRITE INTO TABLE enableins_stag.insurance_riskfactors;
CREATE TABLE enableins.insurance_riskfactors
ROW FORMAT DELIMITED FIELDS TERMINATED BY ','
STORED AS PARQUET AS select * from enableins_stag.insurance_riskfactors;
