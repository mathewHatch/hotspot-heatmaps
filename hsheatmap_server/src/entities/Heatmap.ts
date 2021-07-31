import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Float, Int, ObjectType } from "type-graphql";
import { Domain } from "./Domain";

@ObjectType()
@Entity()
export class Heatmap {
  @Field(() => Int)
  @PrimaryKey()
  _id!: number;

  @Field(() => Domain)
  @ManyToOne()
  domain!: Domain;

  @Field(() => String)
  @Property()
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "text" })
  subdomain!: string;

  @Field(() => Float)
  @Property({ type: "text" })
  xloc!: number;

  @Field(() => Float)
  @Property()
  yloc!: number;

  @Field(() => Float)
  @Property()
  value!: number;
}
