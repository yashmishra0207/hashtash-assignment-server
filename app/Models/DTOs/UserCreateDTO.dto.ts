export interface UserCreateDTO {
    fullName: string
    email: string
    handle: string
    phone?: string
    location?: string
    profilePic?: string
    about?: string
    password: string
}
