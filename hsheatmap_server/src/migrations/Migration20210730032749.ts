import { Migration } from '@mikro-orm/migrations';

export class Migration20210730032749 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "domain" add column "url" varchar(255) not null;');
  }

}
