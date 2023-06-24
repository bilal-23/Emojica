export type allUsers = {
    "_id": string,
    "verified": boolean,
    "firstName": string,
    "lastName": string,
    "username": string,
    "email": string
    "link": string,
    "bio": string,
    "pic": string,
    "followers": [],
    "following": [],
    "createdAt": Date,
    "updatedAt": Date,
}

export type profile = {
    "_id": string,
    "verified": boolean,
    "firstName": string,
    "lastName": string,
    "username": string,
    "email": string
    "link": string,
    "bio": string,
    "pic": string,
    "followers": [],
    "following": [],
    "bookmarks": [],
    "createdAt": Date,
    "updatedAt": Date,
}