import { Migration } from "@mikro-orm/migrations";

export class Migration20241106111253 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table `locked_event` add column `name` text not null default "";',
    );
    this.addSql(
      'alter table `locked_event` add column `symbol` text not null default "";',
    );
    this.addSql(
      "alter table `locked_event` add column `royalty` bigint not null default 0;",
    );
    this.addSql(
      'alter table `locked_event` add column `royalty_receiver` text not null default "";',
    );
    this.addSql(
      "alter table `locked_event` add column `fee` bigint not null default 0;",
    );
    this.addSql(
      'alter table `locked_event` add column `img_uri` text null default "";',
    );
  }
}
