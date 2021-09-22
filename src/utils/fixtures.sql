INSERT INTO "ProcessTemplate"("title", "slug") VALUES('Onboarding', 'onboarding'),('Løpende', 'lopende'),('Offboarding', 'offboarding');


INSERT INTO "Phase"("id", "title", "processTemplateId", "dueDateDayOffset", "dueDate", "active") VALUES('forOppstart', 'Før oppstart', 'onboarding', -7, null, true),('1.kvartal', '1. Kvartal', 'lopende', 0 , '2021-03-31', true),('siste_arbeidsdag', 'Siste arbeidsdag', 'offboarding', 0 , null, true);

INSERT INTO "Task"("id", "title", "description", "link", "global", "phaseId", "active") VALUES('task1', 'Registrere i Tripletex', 'Den må gjøres før denne dagen', 'https://www.tripletex.no/', true, 'forOppstart', true), ('task2', 'Personaltouch', 'Snakk om hvordan ting har gått', null, true, '1.kvartal', true),('task3', 'Avslutningssamtale', 'Snakk om hvordan ting har gått',null, true, 'siste_arbeidsdag', true)