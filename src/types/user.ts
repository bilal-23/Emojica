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
    "followers": { _id: string }[] | [],
    "following": { _id: string }[] | [],
    "bookmarks": [],
    "createdAt": Date,
    "updatedAt": Date,
}

export interface NextAuthSession {
    user: {
        email: string,
        sub: string,
        id: string,
        iat: number,
        exp: number,
        jti: string
    },
    expires: Date
}