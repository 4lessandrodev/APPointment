CREATE TABLE teams(
	id SERIAL NOT NULL,
	manager INT NOT NULL REFERENCES users(id),
	description VARCHAR(80) NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);