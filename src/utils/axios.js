export const endPoints={
    auth:{
        signup:`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup`,
        login:`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
        me:`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`
    },
    dashboard:{
        blogForm:`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-edit-blog-form`,
    }
}