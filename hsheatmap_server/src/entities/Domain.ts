import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Heatmap } from "./Heatmap";

@ObjectType()
@Entity()
export class Domain {
  @Field(() => Int)
  @PrimaryKey()
  _id!: number;

  @Field(() => String)
  @Property()
  title!: string;

  @Field(() => String)
  @Property()
  url!: string;

  @OneToMany(() => Heatmap, (heatmap) => heatmap.domain)
  domains = new Collection<Heatmap>(this);
}
