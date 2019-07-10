const users = require('./users/model')
const trust = require('./trust/model')
const skill = require('./skill/model')
const comment = require('./comment/model')

const usersArray = [
    {
    "first_name": "Steve",
    "last_name": "Bitmoagira",
    "email": "steve@openrec.be",
    "picture": "https://api.adorable.io/avatars/285/abott@adorable.pngCopy",
    "profession": "web developer",
    "employment": "open-recognition",
    "city": "Louvain la Neuve",
    "country": "Belgium",
    "login": "stevejunior",
    "password": "password"
},
{
    "first_name": "Tamara",
    "last_name": "Asashvili",
    "email": "tamara@openrec.be",
    "picture": "https://api.adorable.io/avatars/285/abott@adorable.pngCopy",
    "profession": "web developer",
    "employment": "open-recognition",
    "city": "Brussels",
    "country": "Belgie",
    "login": "tamara",
    "password": "password"
},
{
    "first_name": "Ibrahim",
    "last_name": "Dogrusoz",
    "email": "ibrahim@openrec.be",
    "picture": "https://api.adorable.io/avatars/285/abott@adorable.pngCopy",
    "profession": "web developer",
    "employment": "open-recognition",
    "city": "Leuven",
    "country": "Belgie",
    "login": "idogrusoz",
    "password": "password"
},
{
    "first_name": "Rami",
    "last_name": "Prakat",
    "email": "rami@openrec.be",
    "picture": "https://api.adorable.io/avatars/285/abott@adorable.pngCopy",
    "profession": "web developer",
    "employment": "open-recognition",
    "city": "Antwerpen",
    "country": "Belgie",
    "login": "ramiprakat",
    "password": "password"
}
]

const trustArray = [
    {
    "userrequesting": 1,
    "userrecieving" : 2,
    "daterequesting": "2019-07-03T13:25:43.511Z",
    "dateapproving": "2019-07-03T13:25:43.511Z",
    "active": true,
    "user1approval": true,
    "user2approval": true
    }, 
    {
    "userrequesting": 2,
    "userrecieving" : 3,
    "daterequesting": "2019-06-23T15:25:43.511Z",
    "dateapproving": "2019-07-03T13:25:43.511Z",
    "active": true,
    "user1approval": true,
    "user2approval": true
    },
    {
    "userrequesting": 3,
    "userrecieving" : 1,
    "daterequesting": "2019-06-28T16:25:43.511Z",
    "dateapproving": "2019-07-03T13:25:43.511Z",
    "active": true,
    "user1approval": true,
    "user2approval": true
    },
    {
    "userrequesting": 1,
    "userrecieving" : 4,
    "daterequesting": "2019-06-28T16:25:43.511Z",
    "dateapproving": "2019-07-03T13:25:43.511Z",
    "active": true,
    "user1approval": true,
    "user2approval": true
    },    
    {
    "userrequesting": 4,
    "userrecieving" : 2,
    "daterequesting": "2019-07-10T16:25:43.511Z",
    "dateapproving": "2019-07-03T13:25:43.511Z",
    "active": true,
    "user1approval": true,
    "user2approval": true
    },

]

const commentsArray = [
    {
    "author": 1,
    "reciever": 2,
    "creationdate": "2019-07-05T12:25:43.511Z",
    "message": "I have seen her work in OSOC19 and was truly impressed"
    },
    {
    "author": 3,
    "reciever": 2,
    "creationdate": "2019-07-05T12:25:43.511Z",
    "message": "She is a dedicated web developer and any company would be lucky to have her"
    },
    {
    "author": 1,
    "reciever": 2,
    "creationdate": "2019-07-05T12:25:43.511Z",
    "message": "She prepares the best cocktails"
    },
    {
    "author": 2,
    "reciever": 1,
    "creationdate": "2019-07-05T12:25:43.511Z",
    "message": "He is a good coder who can inspire others"
    },
    {
    "author": 3,
    "reciever": 1,
    "creationdate": "2019-07-05T12:25:43.511Z",
    "message": "He is the best football player I have ever seen"
    },
    {
    "author": 3,
    "reciever": 1,
    "creationdate": "2019-07-05T12:25:43.511Z",
    "message": "His JavaScript skills are top notch and any company can count on him"
    },
    {
    "author": 1,
    "reciever": 4,
    "creationdate": "2019-07-05T12:25:43.511Z",
    "message": "He is a hardworking employee"
    },
    {
    "author": 2,
    "reciever": 4,
    "creationdate": "2019-07-05T12:25:43.511Z",
    "message": "He can design a very beutiful and efficient UI"
    },
    {
    "author": 4,
    "reciever": 2,
    "creationdate": "2019-07-05T12:25:43.511Z",
    "message": "She is fantastic when it comes to debugging!"
    },
]

const skillsArray = [
    {
    "name": "A good Front-End Developer",
    "author": 1,
    "reciever": 2
    },
    {
    "name": "A good Front-End Developer",
    "author": 3,
    "reciever": 1
    },
    {
    "name": "Is a very good Java Developer",
    "author": 4,
    "reciever": 1
    },
    {
    "name": "Master in CSS",
    "author": 3,
    "reciever": 2
    },
    {
    "name": "Good JavaScript developer",
    "author": 2,
    "reciever": 3
    },
    {
    "name": "Speaks fluent Dutch",
    "author": 1,
    "reciever": 4
    },
]

const generateUsers = (array) => {
    array.forEach(user => {
        users.insert(user)
    });
};

generateUsers(usersArray);

const generateTrust = (array) => {
    array.forEach(trustElement => {
        console.log(trustElement);
        trust.insertTrust(trustElement)
    });
}

generateTrust(trustArray);

const generateSkills = (array) => {
    array.forEach(skillElement => {
        console.log(skillElement);
        skill.insertSkill(skillElement)
    });
}

generateSkills(skillsArray);

const generateComments = (array) => {
    array.forEach(commentElement => {
        console.log(commentElement);
        comment.insertComment(commentElement)
    });
}

generateComments(commentsArray);
