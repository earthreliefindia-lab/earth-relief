import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    title: string;
    date: string;
    readTime: bigint;
    excerpt: string;
    category: string;
}
export interface ImpactStats {
    communitiesReached: bigint;
    plasticReplacedKg: bigint;
    studentsEducated: bigint;
    ecoPartners: bigint;
}
export interface PartnerEntry {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    companyName: string;
}
export interface ContactEntry {
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface backendInterface {
    getAllContactEntries(): Promise<Array<ContactEntry>>;
    getAllPartnerEntries(): Promise<Array<PartnerEntry>>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getImpactStats(): Promise<ImpactStats>;
    submitContactForm(name: string, email: string, subject: string, message: string): Promise<void>;
    submitPartnerForm(name: string, email: string, companyName: string, message: string): Promise<void>;
}
