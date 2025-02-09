import { NextRequest, NextResponse } from "next/server";
import { title } from "process";
import { z } from "zod";
import { prisma } from "../../../../prisma/client";

const newIssueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255),
    description: z.string().min(1, 'Description is required!')
});

export async function POST(request:NextRequest) {
    const body = await request.json();
    const validation = newIssueSchema.safeParse(body);
    if(!validation.success) return NextResponse.json(validation.error.format(), {status: 400})

        const issue = await prisma.issue.create({
            data: { title: body.title, description: body.description }
        })
        return NextResponse.json(issue, {status: 201})
}