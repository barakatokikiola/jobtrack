import { syncJobSources } from "@/features/(protected)/jobs/services/syncJobSources";
import { NextResponse } from "next/server";


export async function POST() {
  try {
    const result = await syncJobSources();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Job sync failed",
      },
      {
        status: 500,
      }
    );
  }
}