import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";

actor {
  module PartnerEntry {
    public func compare(p1 : PartnerEntry, p2 : PartnerEntry) : Order.Order {
      switch (Text.compare(p1.companyName, p2.companyName)) {
        case (#equal) { Int.compare(p1.timestamp, p2.timestamp) };
        case (order) { order };
      };
    };
  };

  type PartnerEntry = {
    name : Text;
    email : Text;
    companyName : Text;
    message : Text;
    timestamp : Int;
  };

  let partnerEntries = Map.empty<Nat, PartnerEntry>();
  var partnerEntryId = 0;

  module ContactEntry {
    public func compare(c1 : ContactEntry, c2 : ContactEntry) : Order.Order {
      switch (Text.compare(c1.name, c2.name)) {
        case (#equal) { Int.compare(c1.timestamp, c2.timestamp) };
        case (order) { order };
      };
    };
  };

  type ContactEntry = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };

  let contactEntries = Map.empty<Nat, ContactEntry>();
  var contactEntryId = 0;

  type BlogPost = {
    title : Text;
    excerpt : Text;
    category : Text;
    date : Text;
    readTime : Nat;
  };

  let blogPosts = [
    {
      title = "How Small Changes Make a Big Impact";
      excerpt = "Discover how minor lifestyle changes can lead to significant environmental benefits.";
      category = "Sustainability";
      date = "2023-08-15";
      readTime = 5;
    },
    {
      title = "Innovative Eco-Friendly Packaging Solutions";
      excerpt = "Explore the latest advancements in sustainable packaging technologies.";
      category = "Eco Packaging";
      date = "2023-07-10";
      readTime = 6;
    },
    {
      title = "Community Clean-Up Drives: Success Stories";
      excerpt = "Learn how communities are coming together to reduce plastic waste.";
      category = "Community";
      date = "2023-09-01";
      readTime = 4;
    },
  ];

  type ImpactStats = {
    plasticReplacedKg : Nat;
    ecoPartners : Nat;
    studentsEducated : Nat;
    communitiesReached : Nat;
  };

  let impactStats : ImpactStats = {
    plasticReplacedKg = 25000;
    ecoPartners = 120;
    studentsEducated = 7800;
    communitiesReached = 45;
  };

  public shared ({ caller }) func submitPartnerForm(name : Text, email : Text, companyName : Text, message : Text) : async () {
    let entry : PartnerEntry = {
      name;
      email;
      companyName;
      message;
      timestamp = Time.now();
    };
    partnerEntries.add(partnerEntryId, entry);
    partnerEntryId += 1;
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, subject : Text, message : Text) : async () {
    let entry : ContactEntry = {
      name;
      email;
      subject;
      message;
      timestamp = Time.now();
    };
    contactEntries.add(contactEntryId, entry);
    contactEntryId += 1;
  };

  public query ({ caller }) func getAllPartnerEntries() : async [PartnerEntry] {
    partnerEntries.values().toArray().sort();
  };

  public query ({ caller }) func getAllContactEntries() : async [ContactEntry] {
    contactEntries.values().toArray().sort();
  };

  public query ({ caller }) func getBlogPosts() : async [BlogPost] {
    blogPosts;
  };

  public query ({ caller }) func getImpactStats() : async ImpactStats {
    impactStats;
  };
};
