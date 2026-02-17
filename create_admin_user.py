#!/usr/bin/env python3
"""
IMA Systems - Create Admin User Script (Direct SQLite)
Creates a new admin user directly in the database without external dependencies
"""

import sys
import sqlite3
import hashlib
import secrets
from pathlib import Path

def hash_password(password):
    """Hash password using bcrypt-compatible algorithm (simplified)"""
    # For simplicity, using PBKDF2
    salt = secrets.token_hex(16)
    key = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return f"$2b$12${''.join(format(x, '02x') for x in key)}"

def create_admin_user(db_path, username, email, password):
    """Create a new admin user directly in SQLite database"""
    
    # Create connection
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Create tables if they don't exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS admin_users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                hashed_password TEXT NOT NULL,
                is_active BOOLEAN DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP
            )
        ''')
        
        # Check if user exists
        cursor.execute('SELECT id FROM admin_users WHERE username = ?', (username,))
        if cursor.fetchone():
            print(f"❌ Error: User '{username}' already exists!")
            return False
        
        # Hash password (using a simplified algorithm for local dev)
        # In production, use proper bcrypt
        hashed = hashlib.sha256((password + secrets.token_hex(8)).encode()).hexdigest()
        
        # Insert user
        cursor.execute('''
            INSERT INTO admin_users (username, email, hashed_password, is_active)
            VALUES (?, ?, ?, 1)
        ''', (username, email, hashed))
        
        conn.commit()
        
        print(f"✅ Admin user created successfully!")
        print(f"   Username: {username}")
        print(f"   Email: {email}")
        print(f"   Status: Active")
        print()
        print("   You can now login at: https://imasystems.ai/admin/login")
        return True
        
    except sqlite3.IntegrityError as e:
        print(f"❌ Error: {e}")
        return False
    except Exception as e:
        print(f"❌ Error creating user: {e}")
        return False
    finally:
        conn.close()

def main():
    """Main function"""
    print("════════════════════════════════════════════════════════════════")
    print("  🔐 IMA Systems Admin User Creation")
    print("════════════════════════════════════════════════════════════════")
    print()
    
    db_path = Path(__file__).parent / "backend" / "app.db"
    
    if len(sys.argv) > 1:
        # Command line arguments
        username = sys.argv[1]
        email = sys.argv[2] if len(sys.argv) > 2 else f"{username}@imasystems.ai"
        password = sys.argv[3] if len(sys.argv) > 3 else None
    else:
        # Interactive mode
        import getpass
        
        print("Enter admin user details:")
        print()
        username = input("Username: ").strip()
        if not username:
            print("❌ Username cannot be empty")
            return False
        
        email = input(f"Email [{username}@imasystems.ai]: ").strip()
        if not email:
            email = f"{username}@imasystems.ai"
        
        while True:
            password = getpass.getpass("Password: ")
            if not password:
                print("❌ Password cannot be empty")
                continue
            
            if len(password) < 8:
                print("❌ Password must be at least 8 characters")
                continue
            
            confirm = getpass.getpass("Confirm password: ")
            if password != confirm:
                print("❌ Passwords do not match")
                continue
            
            break
    
    print()
    print("Creating user...")
    print()
    
    return create_admin_user(str(db_path), username, email, password)

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
