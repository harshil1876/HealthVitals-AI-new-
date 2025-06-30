import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const ProfileSettingsMenu = ({ isMobile = false }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Mock user data - in real app this would come from context/props
  const userData = {
    name: "Pratham Wadhwani",
    email: "prathamwadhwani@gmail.com",
    avatar: null,
    role: "User",
  };

  const menuItems = [
    {
      label: "Settings & Preferences",
      path: "/settings-preferences",
      icon: "Settings",
      description: "Manage your account and preferences",
    },
    {
      label: "Privacy Controls",
      path: "/settings-preferences?tab=privacy",
      icon: "Shield",
      description: "Data privacy and security settings",
    },
    {
      label: "Voice Settings",
      path: "/settings-preferences?tab=voice",
      icon: "Mic",
      description: "Configure voice interaction preferences",
    },
    {
      label: "Help & Support",
      path: "/settings-preferences?tab=support",
      icon: "HelpCircle",
      description: "Get help and contact support",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSignOut = () => {
    // In real app, this would handle authentication logout
    navigate("/user-registration-login");
    setIsOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* User Profile Section */}
        <div className="flex items-center space-x-3 p-4 bg-surface rounded-medical border border-border">
          <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-medium">
            {userData.avatar ? (
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(userData.name)
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-text-primary truncate">
              {userData.name}
            </h3>
            <p className="text-sm text-text-secondary truncate">
              {userData.email}
            </p>
            <p className="text-xs text-text-muted">{userData.role}</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-medical transition-smooth focus-medical hover:bg-surface-100 hover:text-primary"
            >
              <Icon name={item.icon} size={18} color="currentColor" />
              <div className="flex-1">
                <div className="font-medium text-text-primary">
                  {item.label}
                </div>
                <div className="text-sm text-text-secondary">
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleSignOut}
            iconName="LogOut"
            iconSize={16}
            className="w-full justify-center border-error text-error hover:bg-error hover:text-error-foreground"
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-medical transition-smooth focus-medical hover:bg-surface-100"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
          {userData.avatar ? (
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(userData.name)
          )}
        </div>
        <Icon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          size={16}
          className="text-text-secondary"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 mt-2 w-80 bg-background border border-border rounded-medical-lg shadow-medical-lg animate-scale-in z-60"
        >
          {/* User Info Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-medium">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(userData.name)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary truncate">
                  {userData.name}
                </h3>
                <p className="text-sm text-text-secondary truncate">
                  {userData.email}
                </p>
                <p className="text-xs text-text-muted">{userData.role}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-smooth focus-medical hover:bg-surface-100 hover:text-primary"
              >
                <Icon name={item.icon} size={18} color="currentColor" />
                <div className="flex-1">
                  <div className="font-medium text-text-primary">
                    {item.label}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Sign Out */}
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleSignOut}
              iconName="LogOut"
              iconSize={16}
              className="w-full justify-center border-error text-error hover:bg-error hover:text-error-foreground"
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsMenu;
