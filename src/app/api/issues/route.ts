import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { newIssueSchema } from "./validationSchemas";


export async function POST(request:NextRequest) {
     
    const body = await request.json();
    const validation = newIssueSchema.safeParse(body);
    if(!validation.success) return NextResponse.json(validation.error.format(), {status: 400})

        const issue = await prisma.issue.create({
            data: { title: body.title, description: body.description }
        })
        return NextResponse.json(issue, {status: 201})
}