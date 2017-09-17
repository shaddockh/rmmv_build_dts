// rpg_sprites.js v1.5.1
//=============================================================================
//-----------------------------------------------------------------------------
// Sprite_Base
//
// The sprite class with a feature which displays animations.
declare class Sprite_Base extends Sprite {
	initialize();
	update();
	hide();
	show();
	updateVisibility();
	updateAnimationSprites();
	startAnimation(animation, mirror, delay);
	isAnimationPlaying();
}

//-----------------------------------------------------------------------------
// Sprite_Button
//
// The sprite for displaying a button.
declare class Sprite_Button extends Sprite {
	initialize();
	update();
	updateFrame();
	setColdFrame(x, y, width, height);
	setHotFrame(x, y, width, height);
	setClickHandler(method);
	callClickHandler();
	processTouch();
	isActive();
	isButtonTouched();
	canvasToLocalX(x);
	canvasToLocalY(y);
}

//-----------------------------------------------------------------------------
// Sprite_Character
//
// The sprite for displaying a character.
declare class Sprite_Character extends Sprite_Base {

//undefined
	initialize(character?);
	initMembers();
	setCharacter(character);
	update();
	updateVisibility();
	isTile();
	tilesetBitmap(tileId);
	updateBitmap();
	isImageChanged();
	setTileBitmap();
	setCharacterBitmap();
	updateFrame();
	updateTileFrame();
	updateCharacterFrame();
	characterBlockX();
	characterBlockY();
	characterPatternX();
	characterPatternY();
	patternWidth();
	patternHeight();
	updateHalfBodySprites();
	createHalfBodySprites();
	updatePosition();
	updateAnimation();
	updateOther();
	setupAnimation();
	setupBalloon();
	startBalloon();
	updateBalloon();
	endBalloon();
	isBalloonPlaying();
}

//-----------------------------------------------------------------------------
// Sprite_Battler
//
// The superclass of Sprite_Actor and Sprite_Enemy.
declare class Sprite_Battler extends Sprite_Base {

//undefined
	initialize(battler?);
	initMembers();
	setBattler(battler);
	setHome(x, y);
	update();
	updateVisibility();
	updateMain();
	updateBitmap();
	updateFrame();
	updateMove();
	updatePosition();
	updateAnimation();
	updateDamagePopup();
	updateSelectionEffect();
	setupAnimation();
	setupDamagePopup();
	damageOffsetX();
	damageOffsetY();
	startMove(x, y, duration);
	onMoveEnd();
	isEffecting();
	isMoving();
	inHomePosition();
}

//-----------------------------------------------------------------------------
// Sprite_Actor
//
// The sprite for displaying an actor.
declare class Sprite_Actor extends Sprite_Battler {

//undefined
	initialize(battler?);
	initMembers();
	createMainSprite();
	createShadowSprite();
	createWeaponSprite();
	createStateSprite();
	setBattler(battler);
	moveToStartPosition();
	setActorHome(index);
	update();
	updateShadow();
	updateMain();
	setupMotion();
	setupWeaponAnimation();
	startMotion(motionType);
	updateTargetPosition();
	updateBitmap();
	updateFrame();
	updateMove();
	updateMotion();
	updateMotionCount();
	motionSpeed();
	refreshMotion();
	startEntryMotion();
	stepForward();
	stepBack();
	retreat();
	onMoveEnd();
	damageOffsetX();
	damageOffsetY();
}

//-----------------------------------------------------------------------------
// Sprite_Enemy
//
// The sprite for displaying an enemy.
declare class Sprite_Enemy extends Sprite_Battler {

//undefined
	initialize(battler?);
	initMembers();
	createStateIconSprite();
	setBattler(battler);
	update();
	updateBitmap();
	loadBitmap(name, hue);
	updateFrame();
	updatePosition();
	updateStateSprite();
	initVisibility();
	setupEffect();
	startEffect(effectType);
	startAppear();
	startDisappear();
	startWhiten();
	startBlink();
	startCollapse();
	startBossCollapse();
	startInstantCollapse();
	updateEffect();
	isEffecting();
	revertToNormal();
	updateWhiten();
	updateBlink();
	updateAppear();
	updateDisappear();
	updateCollapse();
	updateBossCollapse();
	updateInstantCollapse();
	damageOffsetX();
	damageOffsetY();
}

//-----------------------------------------------------------------------------
// Sprite_Animation
//
// The sprite for displaying an animation.
declare class Sprite_Animation extends Sprite {
	initialize();
	initMembers();
	setup(target, animation, mirror, delay);
	remove();
	setupRate();
	setupDuration();
	update();
	updateFlash();
	updateScreenFlash();
	absoluteX();
	absoluteY();
	updateHiding();
	isPlaying();
	loadBitmaps();
	isReady();
	createSprites();
	createCellSprites();
	createScreenFlashSprite();
	updateMain();
	updatePosition();
	updateFrame();
	currentFrameIndex();
	updateAllCellSprites(frame);
	updateCellSprite(sprite, cell);
	processTimingData(timing);
	startFlash(color, duration);
	startScreenFlash(color, duration);
	startHiding(duration);
}

//-----------------------------------------------------------------------------
// Sprite_Damage
//
// The sprite for displaying a popup damage.
declare class Sprite_Damage extends Sprite {
	initialize();
	setup(target);
	setupCriticalEffect();
	digitWidth();
	digitHeight();
	createMiss();
	createDigits(baseRow, value);
	createChildSprite();
	update();
	updateChild(sprite);
	updateFlash();
	updateOpacity();
	isPlaying();
}

//-----------------------------------------------------------------------------
// Sprite_StateIcon
//
// The sprite for displaying state icons.
declare class Sprite_StateIcon extends Sprite {
	initialize();
	initMembers();
	loadBitmap();
	setup(battler);
	update();
	animationWait();
	updateIcon();
	updateFrame();
}

//-----------------------------------------------------------------------------
// Sprite_StateOverlay
//
// The sprite for displaying an overlay image for a state.
declare class Sprite_StateOverlay extends Sprite_Base {
	initialize();
	initMembers();
	loadBitmap();
	setup(battler);
	update();
	animationWait();
	updatePattern();
	updateFrame();
}

//-----------------------------------------------------------------------------
// Sprite_Weapon
//
// The sprite for displaying a weapon image for attacking.
declare class Sprite_Weapon extends Sprite_Base {
	initialize();
	initMembers();
	setup(weaponImageId);
	update();
	animationWait();
	updatePattern();
	loadBitmap();
	updateFrame();
	isPlaying();
}

//-----------------------------------------------------------------------------
// Sprite_Balloon
//
// The sprite for displaying a balloon icon.
declare class Sprite_Balloon extends Sprite_Base {
	initialize();
	initMembers();
	loadBitmap();
	setup(balloonId);
	update();
	updateFrame();
	speed();
	waitTime();
	frameIndex();
	isPlaying();
}

//-----------------------------------------------------------------------------
// Sprite_Picture
//
// The sprite for displaying a picture.
declare class Sprite_Picture extends Sprite {

//undefined
	initialize(pictureId?);
	picture();
	update();
	updateBitmap();
	updateOrigin();
	updatePosition();
	updateScale();
	updateTone();
	updateOther();
	loadBitmap();
}

//-----------------------------------------------------------------------------
// Sprite_Timer
//
// The sprite for displaying the timer.
declare class Sprite_Timer extends Sprite {
	initialize();
	createBitmap();
	update();
	updateBitmap();
	redraw();
	timerText();
	updatePosition();
	updateVisibility();
}

//-----------------------------------------------------------------------------
// Sprite_Destination
//
// The sprite for displaying the destination place of the touch input.
declare class Sprite_Destination extends Sprite {
	initialize();
	update();
	createBitmap();
	updatePosition();
	updateAnimation();
}

//-----------------------------------------------------------------------------
// Spriteset_Base
//
// The superclass of Spriteset_Map and Spriteset_Battle.
declare class Spriteset_Base extends Sprite {
	initialize();
	createLowerLayer();
	createUpperLayer();
	update();
	createBaseSprite();
	createToneChanger();
	createWebGLToneChanger();
	createCanvasToneChanger();
	createPictures();
	createTimer();
	createScreenSprites();
	updateScreenSprites();
	updateToneChanger();
	updateWebGLToneChanger();
	updateCanvasToneChanger();
	updatePosition();
}

//-----------------------------------------------------------------------------
// Spriteset_Map
//
// The set of sprites on the map screen.
declare class Spriteset_Map extends Spriteset_Base {
	initialize();
	createLowerLayer();
	update();
	hideCharacters();
	createParallax();
	createTilemap();
	loadTileset();
	createCharacters();
	createShadow();
	createDestination();
	createWeather();
	updateTileset();

/*
* Simple fix for canvas parallax issue, destroy old parallax and readd to  the tree.
*/
	_canvasReAddParallax();
	updateParallax();
	updateTilemap();
	updateShadow();
	updateWeather();
}

//-----------------------------------------------------------------------------
// Spriteset_Battle
//
// The set of sprites on the battle screen.
declare class Spriteset_Battle extends Spriteset_Base {
	initialize();
	createLowerLayer();
	createBackground();
	update();
	createBattleField();
	createBattleback();
	updateBattleback();
	locateBattleback();
	battleback1Bitmap();
	battleback2Bitmap();
	battleback1Name();
	battleback2Name();
	overworldBattleback1Name();
	overworldBattleback2Name();
	normalBattleback1Name();
	normalBattleback2Name();
	terrainBattleback1Name(type);
	terrainBattleback2Name(type);
	defaultBattleback1Name();
	defaultBattleback2Name();
	shipBattleback1Name();
	shipBattleback2Name();
	autotileType(z);
	createEnemies();
	compareEnemySprite(a, b);
	createActors();
	updateActors();
	battlerSprites();
	isAnimationPlaying();
	isEffecting();
	isAnyoneMoving();
	isBusy();
}

