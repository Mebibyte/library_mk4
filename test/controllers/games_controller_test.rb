require 'test_helper'

class GamesControllerTest < ActionController::TestCase
  test "should not save game without title" do
    game = Game.new
    game.barcode = "000000"
    assert_not game.save, "Saved the game without a title"
  end

  test "should not save game without barcode" do
  	title = Title.new
  	title.save
    game = Game.new
    game.title = title
    assert_not game.save, "Saved the game without a title"
  end

  test "create new game" do
  	title = Title.new
  	title.save
    game = Game.new
    game.title = title
    game.barcode = "000000"
    assert game.save, "Unable to save game with a title and barcode"
  end
end
