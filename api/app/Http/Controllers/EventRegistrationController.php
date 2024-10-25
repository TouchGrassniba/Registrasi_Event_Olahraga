<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventRegistration;

class EventRegistrationController extends Controller
{
    public function getAllData()
    {
        $data = EventRegistration::all();
        return response()->json([
            'code' => 200,
            'message' => 'Success',
            'data' => $data
        ]);
    }

    public function insertData(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'participant_name' => 'required|string|max:255',
            'event_name' => 'required|string|max:255',
            'event_date' => 'required|date|after_or_equal:today',
            'category' => 'required|string|max:255'
        ]);

        // Generate a unique registration number
        $registrationNumber = 'REG-' . strtoupper(uniqid());

        // Create the event registration entry
        $event = EventRegistration::create(array_merge($validatedData, ['registration_number' => $registrationNumber]));

        return response()->json([
            'code' => 200,
            'message' => 'Success',
            'registration_number' => $registrationNumber // Return the generated registration number
        ]);
    }
}
