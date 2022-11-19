INSERT INTO role_table(id,title)
VALUES(32,"consultant"),(1,"manager"),(50,"counselor");

INSERT INTO employees(id,first_name,last_name,role_id,manager_id)
VALUES (1,"John","Doe",32,2), (2,"Joe","Smith",1,10),(3,"James","Stark",50,10);


