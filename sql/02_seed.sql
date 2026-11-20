
BEGIN;

-- =====================================
-- 1. PERSONAS
-- =====================================

INSERT INTO public.persona (nombre, email, contrasena)
VALUES
('Carlos García', 'carlos@gmail.com', '123456'),
('Miguel López', 'miguel@gmail.com', '123456'),
('David Fernández', 'david@gmail.com', '123456');

-- =====================================
-- 2. TEMPORADAS
-- =====================================

INSERT INTO public.temporada
(nombre, fecha_inicio, fecha_fin, activa)
VALUES
('2025-2026', '2025-09-01', '2026-06-30', false),
('2026-2027', '2026-09-01', '2027-06-30', true);

-- =====================================
-- 3. TIPOS DE MULTAS
-- =====================================

INSERT INTO public.tipos_multas
(nombre, descripcion, importe_base, activa)
VALUES
('Retraso', 'Llegar tarde al entrenamiento', 5.00, true),
('Falta entrenamiento', 'No asistir al entrenamiento sin justificar', 10.00, true),
('Falta partido', 'No asistir a un partido sin justificar', 20.00, true);

-- =====================================
-- 4. JUGADORES
-- =====================================

INSERT INTO public.jugador
(id_persona, nombre, capitan, posicion, dorsal, fecha_alta)
VALUES
(1, 'Carlos García', true, 1, 10, '2025-09-01'),
(2, 'Miguel López', false, 2, 7, '2025-09-01'),
(3, 'David Fernández', false, 3, 9, '2025-09-01');

-- =====================================
-- 5. MULTAS DE JUGADORES
-- =====================================

INSERT INTO public.multas_jugador
(id_jugador, id_tipomulta, id_temporada, importe,
 fecha_multa, pagada, activa, observaciones)
VALUES
(1, 1, 2, 5.00, '2026-09-10', false, true, 'Llegó 15 minutos tarde'),
(2, 2, 2, 10.00, '2026-09-15', true, true, 'Falta sin justificar'),
(3, 1, 2, 5.00, '2026-09-20', false, true, 'Llegó tarde al entrenamiento'),
(1, 3, 1, 20.00, '2026-03-10', true, true, 'No asistió al partido');


COMMIT;---------------------------------------------------------------
--  Consultas de comprobación (opcionales)
-- ---------------------------------------------------------------------
-- Héroes con su creador y sus poderes:
--   SELECT h.name AS heroe, u.username AS creador,
--          STRING_AGG(p.name, ', ' ORDER BY p.name) AS poderes
--   FROM heroes h
--   JOIN users u            ON u.id = h.user_id
--   LEFT JOIN hero_powers hp ON hp.hero_id = h.id
--   LEFT JOIN powers p       ON p.id = hp.power_id
--   GROUP BY h.id, u.username
--   ORDER BY h.id;
--
-- Poderes y cuántos héroes los tienen (incluye los que no tiene nadie):
--   SELECT p.name, COUNT(hp.hero_id) AS num_heroes
--   FROM powers p
--   LEFT JOIN hero_powers hp ON hp.power_id = p.id
--   GROUP BY p.id
--   ORDER BY num_heroes DESC;