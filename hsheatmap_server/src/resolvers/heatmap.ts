import { Heatmap } from "../entities/Heatmap";
import { Resolver, Query, Ctx, Arg, Mutation, Float } from "type-graphql";
import { MyContext } from "../types";
import { Domain } from "../entities/Domain";

@Resolver()
export class HeatmapResolver {
  @Query(() => [Heatmap])
  heatmaps(@Ctx() { em }: MyContext): Promise<Heatmap[]> {
    return em.find(Heatmap, {});
  }
  @Query(() => Heatmap, { nullable: true })
  heatmap(
    @Arg("id") _id: number,
    @Ctx() { em }: MyContext
  ): Promise<Heatmap | null> {
    return em.findOne(Heatmap, { _id });
  }

  @Query(() => [Heatmap], { nullable: true })
  async heatmapInfo(
    @Arg("domain", () => String) domainTitle: string,
    @Ctx() { em }: MyContext
  ): Promise<Heatmap[] | null> {
    const domainEntity = await em.findOne(Domain, { title: domainTitle });
    const result = await em.find(Heatmap, { domain: domainEntity });
    if (!result) {
    } else {
      return result;
    }
    return result;
  }

  @Mutation(() => Heatmap)
  async createHeatmap(
    @Arg("xloc", () => Float) xloc: number,
    @Arg("yloc", () => Float) yloc: number,
    @Arg("value", () => Float) value: number,
    @Arg("subdomain", () => String) subdomain: string,
    @Arg("domain", () => String) domain: string,
    @Ctx() { em }: MyContext
  ): Promise<Heatmap> {
    const domainEntity = await em.findOne(Domain, { title: domain });
    const heatmap = em.create(Heatmap, {
      xloc,
      yloc,
      value,
      subdomain,
      domain: await domainEntity,
    });
    await em.persistAndFlush(heatmap);
    return heatmap;
  }
  @Mutation(() => Heatmap, { nullable: true })
  async updateHeatmap(
    @Arg("id") _id: number,
    @Arg("domain", () => String) domain: Domain,
    @Arg("xloc", () => Float, { nullable: true }) xloc: number,
    @Arg("yloc", () => Float, { nullable: true }) yloc: number,
    @Arg("value", () => Float, { nullable: true }) value: number,
    @Arg("subdomain", () => String) subdomain: string,
    @Ctx() { em }: MyContext
  ): Promise<Heatmap | null> {
    const heatmap = await em.findOne(Heatmap, { _id });
    if (!heatmap) {
      return null;
    }
    if (typeof domain !== "undefined") {
      heatmap.domain = domain;
      heatmap.xloc = xloc;
      heatmap.yloc = yloc;
      heatmap.value = value;
      heatmap.subdomain = subdomain;
      await em.persistAndFlush(heatmap);
    }
    return heatmap;
  }
  @Mutation(() => Heatmap, { nullable: true })
  async deleteHeatmap(
    @Arg("id") _id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Heatmap, { _id });
    } catch {
      return false;
    }
    return true;
  }
}
