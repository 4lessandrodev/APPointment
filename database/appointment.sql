-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(80) NULL,
  email VARCHAR(120) NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT false,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------
-- Table `tasks`
-- -----------------------------------------------------
CREATE TABLE tasks (
  id SERIAL NOT NULL PRIMARY KEY,
  startAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  doneAt TIMESTAMP NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  description VARCHAR(120) NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  users_id INT NOT NULL REFERENCES users (id) 
);

-- -----------------------------------------------------
-- Table `teams`
-- -----------------------------------------------------
CREATE TABLE teams (
  id SERIAL NOT NULL PRIMARY KEY,
  description VARCHAR(80) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  manager INT NOT NULL  REFERENCES users (id)
);

-- -----------------------------------------------------
-- Table `team_has_users`
-- -----------------------------------------------------

CREATE TABLE team_has_users (
  teams_id INT NOT NULL,
  users_id INT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_teams_has_users_teams1
    FOREIGN KEY (teams_id)
    REFERENCES teams (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_teams_has_users_users1
    FOREIGN KEY (users_id)
    REFERENCES users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
	
