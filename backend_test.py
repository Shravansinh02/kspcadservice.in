#!/usr/bin/env python3
"""
Backend API Testing for KSP CAD Service
Tests the contact form submission and retrieval endpoints
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("ERROR: Could not get backend URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BASE_URL}/api"

print(f"Testing KSP CAD Service Backend API at: {API_BASE}")
print("=" * 60)

# Test data
VALID_CONTACT_DATA = {
    "name": "Rajesh Kumar",
    "email": "rajesh.kumar@kspcadservice.top", 
    "phone": "+91 9876543210",
    "message": "I need a 2D floor plan for my new house project. The plot size is 30x40 feet and I want a 3BHK design."
}

INVALID_EMAIL_DATA = {
    "name": "Test User",
    "email": "invalid-email-format",
    "phone": "+91 9876543210", 
    "message": "Test message"
}

MISSING_FIELDS_DATA = {
    "name": "Test User",
    "email": "test@example.com"
    # Missing phone and message
}

def test_contact_form_submission():
    """Test POST /api/contact with valid data"""
    print("\n1. Testing Contact Form Submission (POST /api/contact)")
    print("-" * 50)
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=VALID_CONTACT_DATA, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Contact form submitted successfully")
            print(f"Response data: {json.dumps(data, indent=2, default=str)}")
            
            # Verify response contains required fields
            required_fields = ['id', 'name', 'email', 'phone', 'message', 'timestamp', 'status']
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print(f"❌ Missing fields in response: {missing_fields}")
                return False
            else:
                print("✅ All required fields present in response")
                return data['id']  # Return ID for later use
        else:
            print(f"❌ Failed with status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def test_get_contact_submissions():
    """Test GET /api/contact"""
    print("\n2. Testing Retrieve Contact Submissions (GET /api/contact)")
    print("-" * 50)
    
    try:
        response = requests.get(f"{API_BASE}/contact", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Retrieved {len(data)} contact submissions")
            
            if len(data) > 0:
                print("Sample submission:")
                print(json.dumps(data[0], indent=2, default=str))
                
                # Check if sorted by timestamp (newest first)
                if len(data) > 1:
                    timestamps = [datetime.fromisoformat(item['timestamp'].replace('Z', '+00:00')) for item in data]
                    is_sorted = all(timestamps[i] >= timestamps[i+1] for i in range(len(timestamps)-1))
                    if is_sorted:
                        print("✅ Submissions are sorted by timestamp (newest first)")
                    else:
                        print("❌ Submissions are NOT properly sorted by timestamp")
                        return False
                
                return True
            else:
                print("ℹ️ No submissions found (this might be expected)")
                return True
        else:
            print(f"❌ Failed with status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def test_invalid_email():
    """Test email validation with invalid email format"""
    print("\n3. Testing Email Validation (Invalid Email)")
    print("-" * 50)
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=INVALID_EMAIL_DATA, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 422:
            print("✅ Correctly rejected invalid email format (422 status)")
            print(f"Error response: {response.text}")
            return True
        else:
            print(f"❌ Expected 422 status code for invalid email, got: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def test_missing_required_fields():
    """Test required field validation"""
    print("\n4. Testing Required Fields Validation")
    print("-" * 50)
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=MISSING_FIELDS_DATA, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 422:
            print("✅ Correctly rejected missing required fields (422 status)")
            print(f"Error response: {response.text}")
            return True
        else:
            print(f"❌ Expected 422 status code for missing fields, got: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def test_api_root():
    """Test basic API connectivity"""
    print("\n0. Testing API Connectivity (GET /api/)")
    print("-" * 50)
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API is accessible: {data}")
            return True
        else:
            print(f"❌ API root endpoint failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ API connectivity failed: {e}")
        return False

def main():
    """Run all tests"""
    print("Starting KSP CAD Service Backend API Tests")
    print(f"Backend URL: {BASE_URL}")
    print(f"API Base: {API_BASE}")
    
    results = {}
    
    # Test API connectivity first
    results['api_connectivity'] = test_api_root()
    
    # Test contact form submission
    submission_id = test_contact_form_submission()
    results['contact_submission'] = bool(submission_id)
    
    # Test retrieving submissions
    results['get_submissions'] = test_get_contact_submissions()
    
    # Test email validation
    results['email_validation'] = test_invalid_email()
    
    # Test required fields validation
    results['required_fields'] = test_missing_required_fields()
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(results.values())
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
        return True
    else:
        print("⚠️ Some tests failed - check details above")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)