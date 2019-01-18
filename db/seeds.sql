USE todo_db;

INSERT INTO users (name, email, password_hash) VALUES 
("huwu55", "huwu55@gmail.com", "huwu55password"),
("huwu", "huwu@ucdavis.edu", "huwupassword"),
("sharine", "sharine2009@hotmail.com", "sharinepassword"),
("chareen", "chareen55@gmail.com", "chareenpassword"),
("guoqinwu", "guoqinwu@gmail.com", "guoqinwupassword"),
("nickwu", "hwu@umass.edu", "nickypassword"),
("lisa", "lisawu@gmail.com", "lisapassword");

INSERT INTO projects (name, creator_id) VALUES 
("musicsonglyrics", 1);

INSERT INTO users_projects (user_id, project_id) VALUES 
(1, 1), (2, 1), (6, 1);

INSERT INTO todos (task, project_id, belongs_to, finished) VALUES 
("html and css", 1, 6, false), 
("youtube and lyrics api", 1, 1, true),
("link backend and frontend", 1, 2, false);