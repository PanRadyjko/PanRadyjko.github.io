CREATE TABLE tank
(
    id integer not null constraint tank_pk primary key autoincrement,
    name text not null,
    type text not null,
    caliber text not null,
    faction text not null
);