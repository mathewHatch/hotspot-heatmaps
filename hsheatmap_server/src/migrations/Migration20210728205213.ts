import { Migration } from '@mikro-orm/migrations';

export class Migration20210728205213 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "domain" ("_id" serial primary key, "title" varchar(255) not null);');

    this.addSql('alter table "heatmap" rename column "title" to "subdomain";');


    this.addSql('alter table "heatmap" add column "domain__id" int4 not null;');
    this.addSql('alter table "heatmap" drop column "url";');

    this.addSql('alter table "heatmap" add constraint "heatmap_domain__id_foreign" foreign key ("domain__id") references "domain" ("_id") on update cascade;');
  }

}
