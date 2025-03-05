
/*
	CLIENTS
ClientID Nom	Prenom	 Telephone	Email
1	Dupont	Alain	0123456789	alain.dupont@email.com
2	Martin	Sophie	0987654321	sophie.martin@email.com
3	Lefevre	Jean	0147258369	jean.lefevre@email.com
4	Laurent	Camille	0765432198	camille.laurent@email.com
5	Bernard	Paul	0692837456	paul.bernard@email.com

Table Vehicules
VehiculeID	ClientID	Immatriculation	Marque	Modele	Annee
101	1	AB-123-CD	Renault	Clio	2018
102	2	XY-456-ZT	Peugeot	208	2020
103	3	ZM-789-PQ	BMW	S�rie 3	2017
104	4	JF-654-KM	Audi	A4	2019
105	5	KI-321-LM	Volkswagen	Golf	2021

Table Types_Interventions
TypeID	Nom	Prix_base
1	Vidange	50
2	Changement de pneus	80
3	R�vision moteur	120
4	Contr�le technique	60
5	R�paration frein	150

Table Interventions
InterventionID	VehiculeID	TypeID	Date_Intervention	Statut	Prix	Description
201	101	1	2025-02-10	Termin�	55	Vidange moteur effectu�e.
202	102	2	2025-02-15	En cours	85	Changement de pneus hiver.
203	103	3	2025-02-18	Termin�	130	R�vision moteur compl�te.
204	104	4	2025-02-22	Termin�	60	Contr�le technique.
205	105	5	2025-03-01	En cours	150	R�paration des freins avant.


*/

USE Garage
GO


--Clients--
INSERT INTO Clients (nom, prenom, telephone, email) 
VALUES('Dupont', 'Alain', '0123456789', 'alain.dupont@email.com');

INSERT INTO Clients (nom, prenom, telephone, email) 
VALUES('Martin', 'Sophie', '0987654321', 'sophie.martin@email.com');

INSERT INTO Clients (nom, prenom, telephone, email) 
VALUES('Lefevre', 'Jean', '0147258369', 'jean.lefevre@email.com');

INSERT INTO Clients (nom, prenom, telephone, email) 
VALUES('Laurent', 'Camille', '0765432198', 'camille.laurent@email.com');

INSERT INTO Clients (nom, prenom, telephone, email) 
VALUES('Bernard', 'Paul', '0692837456', 'paul.bernard@email.com');

SELECT * FROM Clients;



--V�hicules--
INSERT INTO Vehicules (client_id, immatriculation, marque, modele, annee) 
VALUES(1, 'AB-123-CD', 'Renault', 'Clio', 2018);

INSERT INTO Vehicules (client_id, immatriculation, marque, modele, annee) 
VALUES(2, 'XY-456-ZT', 'Peugeot', '208', 2020);

INSERT INTO Vehicules (client_id, immatriculation, marque, modele, annee) 
VALUES(3,'ZM-789-PQ','BMW','S�rie 3', 2017);

INSERT INTO Vehicules (client_id, immatriculation, marque, modele, annee) 
VALUES(4, 'JF-654-KM', 'Audi', 'A4', 2019);

INSERT INTO Vehicules (client_id, immatriculation, marque, modele, annee) 
VALUES(5, 'KI-321-LM', 'Volkswagen','Golf', 2021);

SELECT * FROM Vehicules;
--Types_interventions--
INSERT INTO Types_interventions (nom, prix_base) 
VALUES('Vidange', 50);

INSERT INTO Types_interventions (nom, prix_base) 
VALUES('Changement de pneus', 80);

INSERT INTO Types_interventions (nom, prix_base) 
VALUES('R�vision moteur', 120);

INSERT INTO Types_interventions (nom, prix_base) 
VALUES('Contr�le technique', 60);

INSERT INTO Types_interventions (nom, prix_base) 
VALUES('R�paration frein', 150);

SELECT * FROM Types_interventions;

--Interventions--

INSERT INTO Interventions (vehicule_id, type_intervention_id, Date_Intervention, Statut, Prix, description) 
VALUES(1, 1, '2025-02-10', 'Termin�', 55, 'Vidange moteur effectu�e.');

INSERT INTO Interventions (vehicule_id, type_intervention_id, Date_Intervention, Statut, Prix, description) 
VALUES(2, 2, '2025-02-15', 'En cours', 85, 'Changement de pneus hiver.');

INSERT INTO Interventions (vehicule_id, type_intervention_id, Date_Intervention, Statut, Prix, description) 
VALUES(3, 3, '2025-02-18', 'Termin�', 130, 'R�vision moteur compl�te.');

INSERT INTO Interventions (vehicule_id, type_intervention_id, Date_Intervention, Statut, Prix, description) 
VALUES(4, 4, '2025-02-22', 'Termin�', 60, 'Contr�le technique.');

INSERT INTO Interventions (vehicule_id, type_intervention_id, Date_Intervention, Statut, Prix, description) 
VALUES(5, 5, '2025-03-01', 'En cours', 150, 'R�paration des freins avant.');

SELECT * FROM Interventions;











