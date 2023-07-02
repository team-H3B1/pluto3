create user h3b1@localhost;
create schema h3b1;
create table h3b1.conversations (
  id int unsigned not null auto_increment primary key,
  request text not null,
  response text not null,
  createdAt timestamp default CURRENT_TIMESTAMP()
);

create table h3b1.alerts (
  id int unsigned not null auto_increment primary key,
  message text not null,
  createdAt timestamp default CURRENT_TIMESTAMP()
);

create table h3b1.schedules (
  id int unsigned not null auto_increment primary key,
  content text not null,
  `date` char(6) not null,
  createdAt timestamp default CURRENT_TIMESTAMP()
);

grant all on h3b1.* to h3b1@localhost;
