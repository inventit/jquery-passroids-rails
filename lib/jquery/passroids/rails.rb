require "jquery/passroids/rails/version"

module Jquery
  module Passroids
    module Rails
      class Engine < ::Rails::Engine
        config.eager_load_paths << "#{self.root}/lib"
      end
    end
  end
end
