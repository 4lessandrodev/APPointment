
-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------

CREATE TABLE public.users(
    id SERIAL NOT NULL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    admin boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);




-- -----------------------------------------------------
-- Table `teams`
-- -----------------------------------------------------

CREATE TABLE public.teams(
    id SERIAL NOT NULL PRIMARY KEY,
    description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    manager integer NOT NULL,
    CONSTRAINT teams_manager_fkey FOREIGN KEY (manager)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);



-- -----------------------------------------------------
-- Table `tasks`
-- -----------------------------------------------------

CREATE TABLE public.tasks
(
    id SERIAL NOT NULL PRIMARY KEY,
    start_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    done_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    done boolean NOT NULL DEFAULT false,
    users_id integer NOT NULL,
    CONSTRAINT tasks_users_id_fkey FOREIGN KEY (users_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);



-- -----------------------------------------------------
-- Table `team_has_users`
-- -----------------------------------------------------

CREATE TABLE public.team_has_users
(
    id SERIAL NOT NULL PRIMARY KEY,
    teams_id integer NOT NULL,
    users_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT team_has_users_teams_id_fkey FOREIGN KEY (teams_id)
        REFERENCES public.teams (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT team_has_users_users_id_fkey FOREIGN KEY (users_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
	
