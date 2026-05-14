import { describe, expect, it } from "vitest";
import calculateHeroStrengthPower from "../utils/heroStrength";

describe("heroStrength function:",()=>{
    it("should return 'weak' when passing 9",()=>{
        expect(calculateHeroStrengthPower(9)).toMatch(/weak/);
    })
    it("should return 'strong' when passing 10",()=>{
        expect(calculateHeroStrengthPower(10)).toMatch(/strong/);
    })
    it("should return 'strong' when passing 19",()=>{
        expect(calculateHeroStrengthPower(19)).toMatch(/strong/);
    })
    it("should return 'unbelievable' when passing 20",()=>{
        expect(calculateHeroStrengthPower(20)).toMatch(/unbelievable/);
    })
    it("should return 'unbelievable' when passing 22",()=>{
        expect(calculateHeroStrengthPower(22)).toMatch(/unbelievable/);
    })
})