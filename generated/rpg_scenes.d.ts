/**
* The Superclass of all scene within the game.
*
* @class Scene_Base
* @constructor
* @extends Stage
*/
declare class Scene_Base extends Stage {

/**
* Create a instance of Scene_Base.
*
* @instance
* @memberof Scene_Base
*/
	initialize();

/**
* Attach a reservation to the reserve queue.
*
* @method attachReservation
* @instance
* @memberof Scene_Base
*/
	attachReservation();

/**
* Remove the reservation from the Reserve queue.
*
* @method detachReservation
* @instance
* @memberof Scene_Base
*/
	detachReservation();

/**
* Create the components and add them to the rendering process.
*
* @method create
* @instance
* @memberof Scene_Base
*/
	create();

/**
* Returns whether the scene is active or not.
*
* @method isActive
* @instance
* @memberof Scene_Base
* @return {Boolean} return true if the scene is active
*/
	isActive();

/**
* Return whether the scene is ready to start or not.
*
* @method isReady
* @instance
* @memberof Scene_Base
* @return {Boolean} Return true if the scene is ready to start
*/
	isReady();

/**
* Start the scene processing.
*
* @method start
* @instance
* @memberof Scene_Base
*/
	start();

/**
* Update the scene processing each new frame.
*
* @method update
* @instance
* @memberof Scene_Base
*/
	update();

/**
* Stop the scene processing.
*
* @method stop
* @instance
* @memberof Scene_Base
*/
	stop();

/**
* Return whether the scene is busy or not.
*
* @method isBusy
* @instance
* @memberof Scene_Base
* @return {Boolean} Return true if the scene is currently busy
*/
	isBusy();

/**
* Terminate the scene before switching to a another scene.
*
* @method terminate
* @instance
* @memberof Scene_Base
*/
	terminate();

/**
* Create the layer for the windows children
* and add it to the rendering process.
*
* @method createWindowLayer
* @instance
* @memberof Scene_Base
*/
	createWindowLayer();

/**
* Add the children window to the windowLayer processing.
*
* @method addWindow
* @instance
* @memberof Scene_Base
*/
	addWindow(window);

/**
* Request a fadeIn screen process.
*
* @method startFadeIn
* @param {Number} [duration=30] The time the process will take for fadeIn the screen
* @param {Boolean} [white=false] If true the fadein will be process with a white color else it's will be black
*
* @instance
* @memberof Scene_Base
*/
	startFadeIn(duration, white);

/**
* Request a fadeOut screen process.
*
* @method startFadeOut
* @param {Number} [duration=30] The time the process will take for fadeOut the screen
* @param {Boolean} [white=false] If true the fadeOut will be process with a white color else it's will be black
*
* @instance
* @memberof Scene_Base
*/
	startFadeOut(duration, white);

/**
* Create a Screen sprite for the fadein and fadeOut purpose and
* add it to the rendering process.
*
* @method createFadeSprite
* @instance
* @memberof Scene_Base
*/
	createFadeSprite(white);

/**
* Update the screen fade processing.
*
* @method updateFade
* @instance
* @memberof Scene_Base
*/
	updateFade();

/**
* Update the children of the scene EACH frame.
*
* @method updateChildren
* @instance
* @memberof Scene_Base
*/
	updateChildren();

/**
* Pop the scene from the stack array and switch to the
* previous scene.
*
* @method popScene
* @instance
* @memberof Scene_Base
*/
	popScene();

/**
* Check whether the game should be triggering a gameover.
*
* @method checkGameover
* @instance
* @memberof Scene_Base
*/
	checkGameover();

/**
* Slowly fade out all the visual and audio of the scene.
*
* @method fadeOutAll
* @instance
* @memberof Scene_Base
*/
	fadeOutAll();

/**
* Return the screen fade speed value.
*
* @method fadeSpeed
* @instance
* @memberof Scene_Base
* @return {Number} Return the fade speed
*/
	fadeSpeed();

/**
* Return a slow screen fade speed value.
*
* @method slowFadeSpeed
* @instance
* @memberof Scene_Base
* @return {Number} Return the fade speed
*/
	slowFadeSpeed();
}

//-----------------------------------------------------------------------------
// Scene_Boot
//
// The scene class for initializing the entire game.
declare class Scene_Boot extends Scene_Base {
	initialize();
	create();
	loadSystemWindowImage();
	static loadSystemImages();
	isReady();
	isGameFontLoaded();
	start();
	updateDocumentTitle();
	checkPlayerLocation();
}

//-----------------------------------------------------------------------------
// Scene_Title
//
// The scene class of the title screen.
declare class Scene_Title extends Scene_Base {
	initialize();
	create();
	start();
	update();
	isBusy();
	terminate();
	createBackground();
	createForeground();
	drawGameTitle();
	centerSprite(sprite);
	createCommandWindow();
	commandNewGame();
	commandContinue();
	commandOptions();
	playTitleMusic();
}

//-----------------------------------------------------------------------------
// Scene_Map
//
// The scene class of the map screen.
declare class Scene_Map extends Scene_Base {
	initialize();
	create();
	isReady();
	onMapLoaded();
	start();
	update();
	updateMainMultiply();
	updateMain();
	isFastForward();
	stop();
	isBusy();
	terminate();
	needsFadeIn();
	needsSlowFadeOut();
	updateWaitCount();
	updateDestination();
	isMapTouchOk();
	processMapTouch();
	isSceneChangeOk();
	updateScene();
	createDisplayObjects();
	createSpriteset();
	createAllWindows();
	createMapNameWindow();
	createMessageWindow();
	createScrollTextWindow();
	updateTransferPlayer();
	updateEncounter();
	updateCallMenu();
	isMenuEnabled();
	isMenuCalled();
	callMenu();
	updateCallDebug();
	isDebugCalled();
	fadeInForTransfer();
	fadeOutForTransfer();
	launchBattle();
	stopAudioOnBattleStart();
	startEncounterEffect();
	updateEncounterEffect();
	snapForBattleBackground();
	startFlashForEncounter(duration);
	encounterEffectSpeed();
}

//-----------------------------------------------------------------------------
// Scene_MenuBase
//
// The superclass of all the menu-type scenes.
declare class Scene_MenuBase extends Scene_Base {
	initialize();
	create();
	actor();
	updateActor();
	createBackground();
	setBackgroundOpacity(opacity);
	createHelpWindow();
	nextActor();
	previousActor();
	onActorChange();
}

//-----------------------------------------------------------------------------
// Scene_Menu
//
// The scene class of the menu screen.
declare class Scene_Menu extends Scene_MenuBase {
	initialize();
	create();
	start();
	createCommandWindow();
	createGoldWindow();
	createStatusWindow();
	commandItem();
	commandPersonal();
	commandFormation();
	commandOptions();
	commandSave();
	commandGameEnd();
	onPersonalOk();
	onPersonalCancel();
	onFormationOk();
	onFormationCancel();
}

//-----------------------------------------------------------------------------
// Scene_ItemBase
//
// The superclass of Scene_Item and Scene_Skill.
declare class Scene_ItemBase extends Scene_MenuBase {
	initialize();
	create();
	createActorWindow();
	item();
	user();
	isCursorLeft();
	showSubWindow(window);
	hideSubWindow(window);
	onActorOk();
	onActorCancel();
	determineItem();
	useItem();
	activateItemWindow();
	itemTargetActors();
	canUse();
	isItemEffectsValid();
	applyItem();
	checkCommonEvent();
}

//-----------------------------------------------------------------------------
// Scene_Item
//
// The scene class of the item screen.
declare class Scene_Item extends Scene_ItemBase {
	initialize();
	create();
	createCategoryWindow();
	createItemWindow();
	user();
	onCategoryOk();
	onItemOk();
	onItemCancel();
	playSeForItem();
	useItem();
}

//-----------------------------------------------------------------------------
// Scene_Skill
//
// The scene class of the skill screen.
declare class Scene_Skill extends Scene_ItemBase {
	initialize();
	create();
	start();
	createSkillTypeWindow();
	createStatusWindow();
	createItemWindow();
	refreshActor();
	user();
	commandSkill();
	onItemOk();
	onItemCancel();
	playSeForItem();
	useItem();
	onActorChange();
}

//-----------------------------------------------------------------------------
// Scene_Equip
//
// The scene class of the equipment screen.
declare class Scene_Equip extends Scene_MenuBase {
	initialize();
	create();
	createStatusWindow();
	createCommandWindow();
	createSlotWindow();
	createItemWindow();
	refreshActor();
	commandEquip();
	commandOptimize();
	commandClear();
	onSlotOk();
	onSlotCancel();
	onItemOk();
	onItemCancel();
	onActorChange();
}

//-----------------------------------------------------------------------------
// Scene_Status
//
// The scene class of the status screen.
declare class Scene_Status extends Scene_MenuBase {
	initialize();
	create();
	start();
	refreshActor();
	onActorChange();
}

//-----------------------------------------------------------------------------
// Scene_Options
//
// The scene class of the options screen.
declare class Scene_Options extends Scene_MenuBase {
	initialize();
	create();
	terminate();
	createOptionsWindow();
}

//-----------------------------------------------------------------------------
// Scene_File
//
// The superclass of Scene_Save and Scene_Load.
declare class Scene_File extends Scene_MenuBase {
	initialize();
	create();
	start();
	savefileId();
	createHelpWindow();
	createListWindow();
	mode();
	activateListWindow();
	helpWindowText();
	firstSavefileIndex();
	onSavefileOk();
}

//-----------------------------------------------------------------------------
// Scene_Save
//
// The scene class of the save screen.
declare class Scene_Save extends Scene_File {
	initialize();
	mode();
	helpWindowText();
	firstSavefileIndex();
	onSavefileOk();
	onSaveSuccess();
	onSaveFailure();
}

//-----------------------------------------------------------------------------
// Scene_Load
//
// The scene class of the load screen.
declare class Scene_Load extends Scene_File {
	initialize();
	terminate();
	mode();
	helpWindowText();
	firstSavefileIndex();
	onSavefileOk();
	onLoadSuccess();
	onLoadFailure();
	reloadMapIfUpdated();
}

//-----------------------------------------------------------------------------
// Scene_GameEnd
//
// The scene class of the game end screen.
declare class Scene_GameEnd extends Scene_MenuBase {
	initialize();
	create();
	stop();
	createBackground();
	createCommandWindow();
	commandToTitle();
}

//-----------------------------------------------------------------------------
// Scene_Shop
//
// The scene class of the shop screen.
declare class Scene_Shop extends Scene_MenuBase {
	initialize();
	prepare(goods, purchaseOnly);
	create();
	createGoldWindow();
	createCommandWindow();
	createDummyWindow();
	createNumberWindow();
	createStatusWindow();
	createBuyWindow();
	createCategoryWindow();
	createSellWindow();
	activateBuyWindow();
	activateSellWindow();
	commandBuy();
	commandSell();
	onBuyOk();
	onBuyCancel();
	onCategoryOk();
	onCategoryCancel();
	onSellOk();
	onSellCancel();
	onNumberOk();
	onNumberCancel();
	doBuy(number);
	doSell(number);
	endNumberInput();
	maxBuy();
	maxSell();
	money();
	currencyUnit();
	buyingPrice();
	sellingPrice();
}

//-----------------------------------------------------------------------------
// Scene_Name
//
// The scene class of the name input screen.
declare class Scene_Name extends Scene_MenuBase {
	initialize();
	prepare(actorId, maxLength);
	create();
	start();
	createEditWindow();
	createInputWindow();
	onInputOk();
}

//-----------------------------------------------------------------------------
// Scene_Debug
//
// The scene class of the debug screen.
declare class Scene_Debug extends Scene_MenuBase {
	initialize();
	create();
	createRangeWindow();
	createEditWindow();
	createDebugHelpWindow();
	onRangeOk();
	onEditCancel();
	refreshHelpWindow();
	helpText();
}

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.
declare class Scene_Battle extends Scene_Base {
	initialize();
	create();
	start();
	update();
	updateBattleProcess();
	isAnyInputWindowActive();
	changeInputWindow();
	stop();
	terminate();
	needsSlowFadeOut();
	updateStatusWindow();
	updateWindowPositions();
	createDisplayObjects();
	createSpriteset();
	createAllWindows();
	createLogWindow();
	createStatusWindow();
	createPartyCommandWindow();
	createActorCommandWindow();
	createHelpWindow();
	createSkillWindow();
	createItemWindow();
	createActorWindow();
	createEnemyWindow();
	createMessageWindow();
	createScrollTextWindow();
	refreshStatus();
	startPartyCommandSelection();
	commandFight();
	commandEscape();
	startActorCommandSelection();
	commandAttack();
	commandSkill();
	commandGuard();
	commandItem();
	selectNextCommand();
	selectPreviousCommand();
	selectActorSelection();
	onActorOk();
	onActorCancel();
	selectEnemySelection();
	onEnemyOk();
	onEnemyCancel();
	onSkillOk();
	onSkillCancel();
	onItemOk();
	onItemCancel();
	onSelectAction();
	endCommandSelection();
}

//-----------------------------------------------------------------------------
// Scene_Gameover
//
// The scene class of the game over screen.
declare class Scene_Gameover extends Scene_Base {
	initialize();
	create();
	start();
	update();
	stop();
	terminate();
	playGameoverMusic();
	createBackground();
	isTriggered();
	gotoTitle();
}

