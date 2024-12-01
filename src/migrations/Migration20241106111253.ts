import { Migration } from "@mikro-orm/migrations";

export class Migration20241106111253 extends Migration {
  async up(): Promise<void> {
    const [exists] = await this.execute(
      `SELECT COUNT(*) as count FROM pragma_table_info('locked_event') WHERE name='name'`,
    );
    if (exists.count > 0) return;
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
