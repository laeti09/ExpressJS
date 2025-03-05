-- Création tables pour exercice Express JS n°04

USE Garage
GO

DROP Table Interventions;
DROP TABLE Vehicules;
DROP TABLE Types_interventions;
DROP TABLE Clients;


CREATE TABLE Clients (
	client_id INT IDENTITY(1,1),
	nom VARCHAR(30),
	prenom VARCHAR(30),
	telephone VARCHAR(20),
	email VARCHAR(30) UNIQUE,
	CONSTRAINT PK_client_id PRIMARY KEY (client_id)
);

CREATE TABLE Vehicules (
	vehicule_id INT IDENTITY(1,1),
	client_id INT,
	immatriculation VARCHAR(50),
	marque VARCHAR(30),
	modele VARCHAR(30),
	annee INT,
	CONSTRAINT PK_vehicules_id PRIMARY KEY (vehicule_id),
	CONSTRAINT FK_vehicules_client_id FOREIGN KEY (client_id)
	REFERENCES Clients (client_id)
);

CREATE TABLE Types_interventions (
	type_intervention_id INT IDENTITY(1,1),
	nom VARCHAR(30),
	prix_base DECIMAL(5, 2),
	CONSTRAINT PK_types_interventions_id PRIMARY KEY (type_intervention_id)
);

CREATE TABLE Interventions (
	intervention_id INT IDENTITY(1,1),
	vehicule_id INT,
	type_intervention_id INT,
	date_intervention DATE,
	statut VARCHAR(30),
	prix DECIMAL(5, 2),
	description VARCHAR(100),
	CONSTRAINT PK_interventions_id PRIMARY KEY (intervention_id),
	CONSTRAINT FK_interventions_vehicule_id FOREIGN KEY (vehicule_id)
	REFERENCES Vehicules (vehicule_id),
	CONSTRAINT FK_interventions_types_interventions_id FOREIGN KEY (type_intervention_id)
	REFERENCES Types_interventions (type_intervention_id)
);


