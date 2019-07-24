const users = require("./users/model");
const trust = require("./trust/model");
const skill = require("./skill/model");
const comment = require("./comment/model");

const usersArray = [
  {
    first_name: "Steve",
    last_name: "Bitomagira",
    email: "steve@openrec.be",
    picture: "/img/pic2.jpg",
    profession: "web developer",
    employment: "open-recognition",
    city: "Louvain la Neuve",
    country: "Belgium",
    login: "stevejunior",
    password: "password"
  },
  {
    first_name: "Tamar",
    last_name: "Asashvili",
    email: "tamara@openrec.be",
    picture: "/img/ti.jpg",
    profession: "web developer",
    employment: "open-recognition",
    city: "Brussels",
    country: "Belgie",
    login: "tamara",
    password: "password"
  },
  {
    first_name: "Ibrahim",
    last_name: "Dogrusoz",
    email: "ibrahim@openrec.be",
    picture: "/img/IMG_4356.jpg",
    profession: "web developer",
    employment: "open-recognition",
    city: "Leuven",
    country: "Belgie",
    login: "idogrusoz",
    password: "password"
  },
  {
    first_name: "Rami",
    last_name: "Prakat",
    email: "rami@openrec.be",
    picture: "/img/blank-profile-picture-973460_640.png",
    profession: "web developer",
    employment: "open-recognition",
    city: "Antwerpen",
    country: "Belgie",
    login: "ramiprakat",
    password: "password"
  }
];

const trustArray = [
  {
    userrequesting: 1,
    userrecieving: 2,
    daterequesting: "2019-07-03T13:25:43.511Z",
    dateapproving: "2019-07-03T13:25:43.511Z",
    active: true,
    user1approval: true,
    user2approval: true
  },
  {
    userrequesting: 2,
    userrecieving: 3,
    daterequesting: "2019-06-23T15:25:43.511Z",
    dateapproving: "2019-07-03T13:25:43.511Z",
    active: true,
    user1approval: true,
    user2approval: true
  },
  {
    userrequesting: 3,
    userrecieving: 1,
    daterequesting: "2019-06-28T16:25:43.511Z",
    dateapproving: "2019-07-03T13:25:43.511Z",
    active: true,
    user1approval: true,
    user2approval: true
  },
  {
    userrequesting: 1,
    userrecieving: 4,
    daterequesting: "2019-06-28T16:25:43.511Z",
    dateapproving: "2019-07-03T13:25:43.511Z",
    active: true,
    user1approval: true,
    user2approval: true
  },
  {
    userrequesting: 4,
    userrecieving: 2,
    daterequesting: "2019-07-10T16:25:43.511Z",
    dateapproving: "2019-07-03T13:25:43.511Z",
    active: true,
    user1approval: true,
    user2approval: true
  }
  // {
  //     "userrequesting": 3,
  //     "userrecieving" : 1,
  //     "daterequesting": "2019-07-10T16:25:43.511Z",
  //     "active": false,
  //     "user1approval": true,
  //     "user2approval": false
  //     },
  //     {
  //         "userrequesting": 2,
  //         "userrecieving" : 1,
  //         "daterequesting": "2019-07-10T16:25:43.511Z",
  //         "active": false,
  //         "user1approval": true,
  //         "user2approval": false
  //         },
  //          {
  //             "userrequesting": 4,
  //             "userrecieving" : 1,
  //             "daterequesting": "2019-07-10T16:25:43.511Z",
  //             "active": false,
  //             "user1approval": true,
  //             "user2approval": false
  //             },
  //             {
  //                 "userrequesting": 8,
  //                 "userrecieving" : 1,
  //                 "daterequesting": "2019-07-10T16:25:43.511Z",
  //                 "active": false,
  //                 "user1approval": true,
  //                 "user2approval": false
  //                 },
];

const commentsArray = [
  {
    author: 1,
    reciever: 2,
    creationdate: "2019-07-05T12:25:43.511Z",
    message: "I have seen her work in OSOC19 and was truly impressed",
    relationship: "friends",
    published: false
  },
  {
    author: 3,
    reciever: 2,
    creationdate: "2019-07-05T12:25:43.511Z",
    message:
      "She is a dedicated web developer and any company would be lucky to have her",
    relationship: "friends",
    published: true
  },
  {
    author: 1,
    reciever: 2,
    creationdate: "2019-07-05T12:25:43.511Z",
    message: "She prepares the best cocktails",
    relationship: "friends",
    published: false
  },
  {
    author: 2,
    reciever: 1,
    creationdate: "2019-07-05T12:25:43.511Z",
    message: "He is a good coder who can inspire others",
    relationship: "friends",
    published: true
  },
  {
    author: 3,
    reciever: 1,
    creationdate: "2019-07-05T12:25:43.511Z",
    message: "He is the best football player I have ever seen",
    relationship: "friends",
    published: true
  },
  {
    author: 3,
    reciever: 1,
    creationdate: "2019-07-05T12:25:43.511Z",
    message:
      "His JavaScript skills are top notch and any company can count on him",
    relationship: "friends",
    published: false
  },
  {
    author: 1,
    reciever: 4,
    creationdate: "2019-07-05T12:25:43.511Z",
    message: "He is a hardworking employee",
    relationship: "friends",
    published: true
  },
  {
    author: 2,
    reciever: 4,
    creationdate: "2019-07-05T12:25:43.511Z",
    message: "He can design a very beutiful and efficient UI",
    relationship: "friends",
    published: false
  },
  {
    author: 4,
    reciever: 2,
    creationdate: "2019-07-05T12:25:43.511Z",
    message: "She is fantastic when it comes to debugging!",
    relationship: "friends",
    published: true
  }
];

const skillsArray = [
  {
    name: "A good Front-End Developer",
    author: 1,
    reciever: 2
  },
  {
    name: "A good Front-End Developer",
    author: 3,
    reciever: 1
  },
  {
    name: "Is a very good Java Developer",
    author: 4,
    reciever: 1
  },
  {
    name: "Master in CSS",
    author: 3,
    reciever: 2
  },
  {
    name: "Good JavaScript developer",
    author: 2,
    reciever: 3
  },
  {
    name: "Speaks fluent Dutch",
    author: 1,
    reciever: 4
  }
];

const generateUsers = array => {
  array.forEach(user => {
    users.insert(user);
  });
};

const generateTrust = array => {
  array.forEach(trustElement => {
    trust.insertTrust(trustElement);
  });
};

const generateSkills = array => {
  array.forEach(skillElement => {
    skill.insertSkill(skillElement);
  });
};

const generateComments = array => {
  array.forEach(commentElement => {
    comment.insertComment(commentElement);
  });
};

const populate = function() {
  users.createTable();

  generateUsers(usersArray);

  trust.createTable();

  generateTrust(trustArray);

  skill.createTable();

  generateSkills(skillsArray);

  comment.createTable();

  generateComments(commentsArray);
};

populate();
