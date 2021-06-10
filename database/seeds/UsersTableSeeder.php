<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'account' => 'admin',
                'password' => bcrypt('123456'),
                'name' => 'Quản trị hệ thống',
                'email' => 'quangtd@newtel.vn',
                'phone' => '123456',
                'avatar' => '',
                'is_admin' => '1',
                'status' => 'AVAILABLE'],
        ]);
    }
}
