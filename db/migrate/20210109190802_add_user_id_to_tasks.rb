class AddUserIdToTasks < ActiveRecord::Migration[6.0]
  def change
    add_belongs_to :tasks, :user
  end
end
