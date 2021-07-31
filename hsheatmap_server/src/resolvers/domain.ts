import { Domain } from "../entities/Domain";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class DomainResolver {
  @Query(() => [Domain])
  domains(@Ctx() { em }: MyContext): Promise<Domain[]> {
    return em.find(Domain, {});
  }
  @Mutation(() => Domain)
  async createDomain(
    @Arg("title") title: string,
    @Arg("url") url: string,
    @Ctx() { em }: MyContext
  ): Promise<Domain> {
    const domain = em.create(Domain, {
      title,
      url,
    });
    await em.persistAndFlush(domain);
    return domain;
  }
  @Mutation(() => Domain, { nullable: true })
  async deleteDomain(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Boolean> {
    try {
      await em.nativeDelete(Domain, { _id: id });
      return true;
    } catch {
      return false;
    }
  }
}
