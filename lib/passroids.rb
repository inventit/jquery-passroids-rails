# -*- encoding : utf-8 -*-
class Passroids
  #
  # Level of strength 
  # 
  LEVELS = ['Weak', 'Medium', 'Strong', 'Excellent']
  
  #
  # Score password.
  # To use password strength meter and match verifier.
  # Implementation from jQuery Passroids.
  # * @param String v password
  # * @return Integer Socre of password.
  #
  def self.test(v)
    s = 0

    return s if v.nil? || v.empty?
    v = v.to_s
    
    # PASSWORD LENGTH ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # Length of 3 or less
    if (v.length < 4)
      return s
    # Length of 4 or less
    elsif (v.length < 5 )
      s = s + 3
    # Length between 5 and 7
    elsif (v.length > 4 && v.length < 8)
      s = s + 6
    # Length between 8 and 15
    elsif (v.length > 7 && v.length < 16)
      s = s + 12
    # Length of 16 or more
    elsif (v.length > 15)
      s = s + 18
    end
    # LETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # At least one lower case letter
    s = s + 1 if v =~ /[a-z]/
    # At least one upper case letter
    s = s + 5 if v =~ /[A-Z]/
    # NUMBERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # At least one number
    s = s + 5 if v =~ /\d+/
    # At least three numbers
    s = s + 5 if v =~ /(.*[0-9].*[0-9].*[0-9])/
    # SPECIAL CHARACTERS ~~~~~~~~~~~~~~~~~~~~~~~~
    # At least one special character
    s = s + 5 if v =~ /.[!,@,#,$,%,^,&,*,?,_,~]/
    # At least two special characters
    s = s + 5 if v =~ /(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/
    # COMBOS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # Both upper and lower case
    s = s + 4 if v =~ /([a-z].*[A-Z])|([A-Z].*[a-z])/
    # Both letters and numbers
    s = s + 4 if (v =~ /([a-zA-Z])/) && (v =~ /([0-9])/)
    # Letters, numbers, and special characters
    s = s + 7 if v =~ /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/
    # Return the score ~~~~~~~~~~~~~~~~~~~~~~~~~~
    s
  end

  #
  # Return strength of specified password.
  # * @param String v password
  # * @return String strength. 'Weak', 'Medium', 'Strong', 'Excellent'
  #
  def self.strength(v)
    eval_score test v
  end

  #
  # Return specified password is week.
  # * @param String v password
  # * @return Bool return true if password is week.
  #
  def self.weak?(v)
    strength(v) == LEVELS[0]
  end

  #
  # Return specified password is medium.
  # * @param String v password
  # * @return Bool return true if password is medium.
  #
  def self.medium?(v)
    strength(v) == LEVELS[1]
  end

  #
  # Return specified password is strong.
  # * @param String v password
  # * @return Bool return true if password is strong.
  #
  def self.strong?(v)
    strength(v) == LEVELS[2]
  end

  #
  # Return specified password is excellent.
  # * @param String v password
  # * @return Bool return true if password is excellent.
  #
  def self.excellent?(v)
    strength(v) == LEVELS[3]
  end

  private
  #
  # Convert score into strength.
  # * @param Integer s score of password.
  # * @return String strength. 'Weak', 'Medium', 'Strong', 'Excellent'
  #
  def self.eval_score(s)
    strength = 0

    case s
    when 0 .. 13
      strength = 0
    when 14 .. 27
      strength = 1
    when 28 .. 40
      strength = 2
    else
      strength = 3
    end

    LEVELS[strength]
  end

end
