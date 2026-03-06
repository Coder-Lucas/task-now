import { NextResponse } from "next/server";

const GET = () => {
    return NextResponse.json(
        {
            status: "OK"
        },
        {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            status: 200,
            statusText: "OK"
        }
    );
};

export { GET };
