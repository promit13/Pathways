const cases = [
  {
    id: 1,
    Name: "Gail De Meyer",
    Date_of_Birth__c: "5/5/2019",
    Status: "injunction not granted",
    Phone: "7655223669"
  },
  {
    id: 2,
    Name: "Adela Kinchley",
    Date_of_Birth__c: "9/19/2019",
    Status: "injunction granted",
    Phone: "9916508260"
  },
  {
    id: 3,
    Name: "Montgomery Battell",
    Date_of_Birth__c: "12/5/2018",
    Status: "pending",
    Phone: "5525594243"
  },
  {
    id: 4,
    Name: "Guinevere Rilings",
    Date_of_Birth__c: "10/28/2019",
    Status: "applied for",
    Phone: "3048220176"
  },
  {
    id: 5,
    Name: "Denni Reichert",
    Date_of_Birth__c: "1/3/2019",
    Status: "contact made",
    Phone: "5198619729"
  },
  {
    id: 6,
    Name: "Bird Dyne",
    Date_of_Birth__c: "3/13/2019",
    Status: "applied for",
    Phone: "4716985561"
  },
  {
    id: 7,
    Name: "Francisca Wofenden",
    Date_of_Birth__c: "11/8/2019",
    Status: "applied for",
    Phone: "7601656228"
  },
  {
    id: 8,
    Name: "Luella Beaconsall",
    Date_of_Birth__c: "4/12/2019",
    Status: "pending",
    Phone: "6447842685"
  },
  {
    id: 9,
    Name: "Sheryl Puttick",
    Date_of_Birth__c: "9/16/2019",
    Status: "injunction granted",
    Phone: "7122248085"
  },
  {
    id: 10,
    Name: "Margarete Mullins",
    Date_of_Birth__c: "7/19/2019",
    Status: "contact made",
    Phone: "9431592987"
  },
  {
    id: 11,
    Name: "Kelbee Standering",
    Date_of_Birth__c: "5/14/2019",
    Status: "contact made",
    Phone: "1776367281"
  },
  {
    id: 12,
    Name: "Orelle Grastye",
    Date_of_Birth__c: "7/31/2019",
    Status: "injunction not granted",
    Phone: "5889209185"
  },
  {
    id: 13,
    Name: "Darill Tournay",
    Date_of_Birth__c: "6/5/2019",
    Status: "injunction granted",
    Phone: "3118575772"
  },
  {
    id: 14,
    Name: "Cody Bosdet",
    Date_of_Birth__c: "6/6/2019",
    Status: "applied for",
    Phone: "7018831122"
  },
  {
    id: 15,
    Name: "Abby Gethings",
    Date_of_Birth__c: "8/28/2019",
    Status: "injunction not granted",
    Phone: "9495197789"
  },
  {
    id: 16,
    Name: "Chilton Colbeck",
    Date_of_Birth__c: "5/29/2019",
    Status: "pending",
    Phone: "3255714078"
  },
  {
    id: 17,
    Name: "Abbot Bilofsky",
    Date_of_Birth__c: "11/5/2019",
    Status: "contact made",
    Phone: "2632537130"
  },
  {
    id: 18,
    Name: "Karmen Barrus",
    Date_of_Birth__c: "11/16/2018",
    Status: "pending",
    Phone: "3881451613"
  },
  {
    id: 19,
    Name: "Cordie Bridden",
    Date_of_Birth__c: "5/18/2019",
    Status: "pending",
    Phone: "8759481984"
  },
  {
    id: 20,
    Name: "Glenden Rabb",
    Date_of_Birth__c: "8/28/2019",
    Status: "injunction not granted",
    Phone: "1988080005"
  },
  {
    id: 21,
    Name: "Cacilie Callen",
    Date_of_Birth__c: "8/18/2019",
    Status: "applied for",
    Phone: "1748495657"
  },
  {
    id: 22,
    Name: "Corabelle Durning",
    Date_of_Birth__c: "4/26/2019",
    Status: "pending",
    Phone: "2959820153"
  },
  {
    id: 23,
    Name: "Ashly Hakewell",
    Date_of_Birth__c: "2/24/2019",
    Status: "injunction not granted",
    Phone: "6155724463"
  },
  {
    id: 24,
    Name: "Dionne Madison",
    Date_of_Birth__c: "6/26/2019",
    Status: "injunction granted",
    Phone: "8826692015"
  },
  {
    id: 25,
    Name: "Sterne Fitton",
    Date_of_Birth__c: "6/2/2019",
    Status: "contact made",
    Phone: "5059474815"
  },
  {
    id: 26,
    Name: "Gena Lattka",
    Date_of_Birth__c: "9/27/2019",
    Status: "injunction granted",
    Phone: "7668609668"
  },
  {
    id: 27,
    Name: "Everard Shimoni",
    Date_of_Birth__c: "10/12/2019",
    Status: "contact made",
    Phone: "1047273625"
  },
  {
    id: 28,
    Name: "Ofella Gutans",
    Date_of_Birth__c: "1/3/2019",
    Status: "applied for",
    Phone: "1098548012"
  },
  {
    id: 29,
    Name: "Bentlee Healks",
    Date_of_Birth__c: "9/17/2019",
    Status: "injunction not granted",
    Phone: "6331010189"
  },
  {
    id: 30,
    Name: "Nessi Ball",
    Date_of_Birth__c: "10/24/2019",
    Status: "applied for",
    Phone: "7047202634"
  },
  {
    id: 31,
    Name: "Rubetta Colthard",
    Date_of_Birth__c: "1/10/2019",
    Status: "applied for",
    Phone: "1382346909"
  },
  {
    id: 32,
    Name: "Templeton Lovick",
    Date_of_Birth__c: "12/25/2018",
    Status: "pending",
    Phone: "6363662583"
  },
  {
    id: 33,
    Name: "Emilee Harbour",
    Date_of_Birth__c: "12/8/2018",
    Status: "pending",
    Phone: "3313663087"
  },
  {
    id: 34,
    Name: "Orville Foresight",
    Date_of_Birth__c: "11/30/2018",
    Status: "pending",
    Phone: "3799974309"
  },
  {
    id: 35,
    Name: "Hatti Perllman",
    Date_of_Birth__c: "8/29/2019",
    Status: "pending",
    Phone: "3073742514"
  },
  {
    id: 36,
    Name: "Olva Skullet",
    Date_of_Birth__c: "11/28/2018",
    Status: "pending",
    Phone: "3841489108"
  },
  {
    id: 37,
    Name: "Ophelia Junifer",
    Date_of_Birth__c: "4/2/2019",
    Status: "injunction granted",
    Phone: "8368859586"
  },
  {
    id: 38,
    Name: "Virgie Macvey",
    Date_of_Birth__c: "3/21/2019",
    Status: "contact made",
    Phone: "4958263269"
  },
  {
    id: 39,
    Name: "Cesar McCome",
    Date_of_Birth__c: "2/17/2019",
    Status: "injunction not granted",
    Phone: "1086253204"
  },
  {
    id: 40,
    Name: "Brena Ginni",
    Date_of_Birth__c: "11/20/2018",
    Status: "applied for",
    Phone: "1533757076"
  }
];

export default cases;

const arr = [{ pending: [{}, {}] }, { "applied for": [{}, {}] }];
