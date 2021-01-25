class CreateAdmins < ActiveRecord::Migration[6.1]
  def change
    create_table :admins do |t|
      t.string :dni, unique: true
      t.string :name
      t.string :lastname
      t.string :phone
      t.text :address
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
