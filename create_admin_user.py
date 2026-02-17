#!/usr/bin/env python3
"""
IMA Systems - Create Admin User Script
Creates a new admin user directly in the database with proper bcrypt password hashing
"""

import sys
import sqlite3
import secrets
from pathlib import Path
from bcrypt import hashpw, gensalt

def hash_password(password):
    """Hash password using bcrypt directly"""
    # bcrypt has a 72-byte limit for passwords
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    # Generate bcrypt hash with salt (12 rounds)
    salt = gensalt(rounds=12)
    hashed = hashpw(password_bytes, salt)
    return hashed.decode('utf-8')

def create_admin_user(db_path, username, email, password):
    """Create a new admin user directly in SQLite database"""
    
    # Create connection
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if user already exists
        cursor.execute("SELECT username FROM admin_users WHERE username = ?", (username,))
        if cursor.fetchone():
            print(f"❌ User '{username}' already exists")
            return False
        
        # Hash the password
        hashed_password = hash_password(password)
        
        # Insert new user
        cursor.execute("""
            INSERT INTO admin_users (username, email, hashed_password, is_active, created_at)
            VALUES (?, ?, ?, 1, datetime('now'))
        """, (username, email, hashed_password))
        
        conn.commit()
        
        print("════════════════════════════════════════════════════════════════")
        print("  🔐 IMA Systems Admin User Created Successfully!")
        print("════════════════════════════════════════════════════════════════")
        print(f"\n✅ User Details:")
        print(f"   Username: {username}")
        print(f"   Email: {email}")
        print(f"   Password: ••••••• (bcrypt hashed)")
        print(f"   Status: Active")
        print(f"\n📝 Note: Login at https://imasystems.ai/admin/login")
        print(f"   This user can now access the admin dashboard.\n")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating user: {e}")
        return False
    finally:
        conn.close()

def main():
    """Main entry point"""
    if len(sys.argv) != 4:
        print("Usage: python3 create_admin_user.py <username> <email> <password>")
        print("Example: python3 create_admin_user.py diawest diawest@imasystems.ai MyPassword123")
        sys.exit(1)
    
    username = sys.argv[1]
    email = sys.argv[2]
    password = sys.argv[3]
    
    print("════════════════════════════════════════════════════════════════")
    print("  🔐 IMA Systems Admin User Creation")
    print("════════════════════════════════════════════════════════════════\n")
    print(f"Creating user '{username}'...\n")
    
    # Database path - look for it in backend app
    db_candidates = [
        Path("backend/app.db"),
        Path("app.db"),
        Path("backend/app/admin.db"),
        Path("./admin.db"),
        Path("~/admin.db").expanduser(),
    ]
    
    db_path = None
    for candidate in db_candidates:
        if candidate.exists():
            db_path = candidate
            break
    
    if not db_path:
        print("❌ Error: Could not find admin.db database")
        print(f"   Searched: {[str(p) for p in db_candidates]}")
        sys.exit(1)
    
    success = create_admin_user(str(db_path), username, email, password)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
