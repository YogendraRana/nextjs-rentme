import { db } from "@/src/db/db"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { UserType, userSchema } from "@/drizzle/schema/user.schema"


// Path: /api/profile/route.ts
export async function GET(req: Request, res: Response) {
    const url = new URL(req.url)
    const email = url.searchParams.get("email")

    try {
        if (email == null) {
            return NextResponse.json({ success: false, message: "Please provide email." }, { status: 400 });
        } 

        // check if the user exists
        const userData = await db.select().from(userSchema).where(eq(userSchema.email, email));
        if (!userData.length) {
            return NextResponse.json({ success: false, message: `${email} is not registered.` }, { status: 400 });
        }
        
        // return success message
        return NextResponse.json({ success: true, message: 'User found.', user: userData[0] }, { status: 200 });
    } catch (err: any){
        return NextResponse.json({ success: false, message: err.message }, { status: err.status || 500 });
    }
}


// Path: /api/profile/route.ts
export async function PATCH(req: Request, res: Response) {
    const url = new URL(req.url)
    const email = url.searchParams.get("email")

    const body = await req.json();
    const { newName, newEmail } = body;

    try {
        if (email == null) {
            return NextResponse.json({ success: false, message: "Please provide email." }, { status: 400 });
        }

        // check if the user exists
        const userData = await db.select().from(userSchema).where(eq(userSchema.email, email));
        if (!userData.length) {
            return NextResponse.json({ success: false, message: `${email} is not registered.` }, { status: 400 });
        }

        // update the user
        const updateObject: Partial<UserType> = {};
        if (newName) updateObject.name = newName;
        if (newEmail) updateObject.email = newEmail;

        await db.update(userSchema).set(updateObject).where(eq(userSchema.email, email));

        // return success message
        return NextResponse.json({ success: true, message: 'Date updated successfully.' }, { status: 200 });

    } catch (err: any){
        return NextResponse.json({ success: false, message: err.message }, { status: err.status || 500 });
    }  
}