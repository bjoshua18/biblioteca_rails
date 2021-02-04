class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.integer :privilege
      t.string :username, unique: true
      t.string :password_digest
      t.string :email, unique: true
      t.string :state
      t.string :type
      t.string :gender
      t.string :photo

      t.timestamps
    end
  end
end
