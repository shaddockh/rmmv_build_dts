// rpg_windows.js v1.5.1
//=============================================================================
//-----------------------------------------------------------------------------
// Window_Base
//
// The superclass of all windows within the game.
declare class Window_Base extends Window {

//undefined
	initialize(x?, y?, width?, height?);
	lineHeight();
	standardFontFace();
	standardFontSize();
	standardPadding();
	textPadding();
	standardBackOpacity();
	loadWindowskin();
	updatePadding();
	updateBackOpacity();
	contentsWidth();
	contentsHeight();
	fittingHeight(numLines);
	updateTone();
	createContents();
	resetFontSettings();
	resetTextColor();
	update();
	updateOpen();
	updateClose();
	open();
	close();
	isOpening();
	isClosing();
	show();
	hide();
	activate();
	deactivate();
	textColor(n);
	normalColor();
	systemColor();
	crisisColor();
	deathColor();
	gaugeBackColor();
	hpGaugeColor1();
	hpGaugeColor2();
	mpGaugeColor1();
	mpGaugeColor2();
	mpCostColor();
	powerUpColor();
	powerDownColor();
	tpGaugeColor1();
	tpGaugeColor2();
	tpCostColor();
	pendingColor();
	translucentOpacity();
	changeTextColor(color);
	changePaintOpacity(enabled);

//undefined
	drawText(text, x, y, maxWidth?, align?);
	textWidth(text);
	drawTextEx(text, x, y);
	convertEscapeCharacters(text);
	actorName(n);
	partyMemberName(n);
	processCharacter(textState);
	processNormalCharacter(textState);
	processNewLine(textState);
	processNewPage(textState);
	obtainEscapeCode(textState);
	obtainEscapeParam(textState);
	processEscapeCharacter(code, textState);
	processDrawIcon(iconIndex, textState);
	makeFontBigger();
	makeFontSmaller();
	calcTextHeight(textState, all);
	drawIcon(iconIndex, x, y);
	drawFace(faceName, faceIndex, x, y, width, height);
	drawCharacter(characterName, characterIndex, x, y);
	drawGauge(x, y, width, rate, color1, color2);
	hpColor(actor);
	mpColor(actor);
	tpColor(actor);
	drawActorCharacter(actor, x, y);
	drawActorFace(actor, x, y, width, height);
	drawActorName(actor, x, y, width);
	drawActorClass(actor, x, y, width);
	drawActorNickname(actor, x, y, width);
	drawActorLevel(actor, x, y);
	drawActorIcons(actor, x, y, width);
	drawCurrentAndMax(current, max, x, y, width, color1, color2);
	drawActorHp(actor, x, y, width);
	drawActorMp(actor, x, y, width);
	drawActorTp(actor, x, y, width);
	drawActorSimpleStatus(actor, x, y, width);

//undefined
	drawItemName(item, x, y, width?);
	drawCurrencyValue(value, unit, x, y, width);
	paramchangeTextColor(change);
	setBackgroundType(type);
	showBackgroundDimmer();
	hideBackgroundDimmer();
	updateBackgroundDimmer();
	refreshDimmerBitmap();
	dimColor1();
	dimColor2();
	canvasToLocalX(x);
	canvasToLocalY(y);
	reserveFaceImages();
}

//-----------------------------------------------------------------------------
// Window_Selectable
//
// The window class with cursor movement and scroll functions.
declare class Window_Selectable extends Window_Base {

//undefined
	initialize(x?, y?, width?, height?);
	index();
	cursorFixed();
	setCursorFixed(cursorFixed);
	cursorAll();
	setCursorAll(cursorAll);
	maxCols();
	maxItems();
	spacing();
	itemWidth();
	itemHeight();
	maxRows();
	activate();
	deactivate();
	select(index);
	deselect();
	reselect();
	row();
	topRow();
	maxTopRow();
	setTopRow(row);
	resetScroll();
	maxPageRows();
	maxPageItems();
	isHorizontal();
	bottomRow();
	setBottomRow(row);
	topIndex();
	itemRect(index);
	itemRectForText(index);
	setHelpWindow(helpWindow);
	showHelpWindow();
	hideHelpWindow();
	setHandler(symbol, method);
	isHandled(symbol);
	callHandler(symbol);
	isOpenAndActive();
	isCursorMovable();
	cursorDown(wrap);
	cursorUp(wrap);
	cursorRight(wrap);
	cursorLeft(wrap);
	cursorPagedown();
	cursorPageup();
	scrollDown();
	scrollUp();
	update();
	updateArrows();
	processCursorMove();
	processHandling();
	processWheel();
	processTouch();
	isTouchedInsideFrame();
	onTouch(triggered);
	hitTest(x, y);
	isContentsArea(x, y);
	isTouchOkEnabled();
	isOkEnabled();
	isCancelEnabled();
	isOkTriggered();
	isCancelTriggered();
	processOk();
	playOkSound();
	playBuzzerSound();
	callOkHandler();
	processCancel();
	callCancelHandler();
	processPageup();
	processPagedown();
	updateInputData();
	updateCursor();
	isCursorVisible();
	ensureCursorVisible();
	callUpdateHelp();
	updateHelp();
	setHelpWindowItem(item);
	isCurrentItemEnabled();
	drawAllItems();
	drawItem(index);
	clearItem(index);
	redrawItem(index);
	redrawCurrentItem();
	refresh();
}

//-----------------------------------------------------------------------------
// Window_Command
//
// The superclass of windows for selecting a command.
declare class Window_Command extends Window_Selectable {

//undefined
	initialize(x?, y?);
	windowWidth();
	windowHeight();
	numVisibleRows();
	maxItems();
	clearCommandList();
	makeCommandList();
	addCommand(name, symbol, enabled, ext);
	commandName(index);
	commandSymbol(index);
	isCommandEnabled(index);
	currentData();
	isCurrentItemEnabled();
	currentSymbol();
	currentExt();
	findSymbol(symbol);
	selectSymbol(symbol);
	findExt(ext);
	selectExt(ext);
	drawItem(index);
	itemTextAlign();
	isOkEnabled();
	callOkHandler();
	refresh();
}

//-----------------------------------------------------------------------------
// Window_HorzCommand
//
// The command window for the horizontal selection format.
declare class Window_HorzCommand extends Window_Command {

//undefined
	initialize(x?, y?);
	numVisibleRows();
	maxCols();
	itemTextAlign();
}

//-----------------------------------------------------------------------------
// Window_Help
//
// The window for displaying the description of the selected item.
declare class Window_Help extends Window_Base {

//undefined
	initialize(numLines?);
	setText(text);
	clear();
	setItem(item);
	refresh();
}

//-----------------------------------------------------------------------------
// Window_Gold
//
// The window for displaying the party's gold.
declare class Window_Gold extends Window_Base {

//undefined
	initialize(x?, y?);
	windowWidth();
	windowHeight();
	refresh();
	value();
	currencyUnit();
	open();
}

//-----------------------------------------------------------------------------
// Window_MenuCommand
//
// The window for selecting a command on the menu screen.
declare class Window_MenuCommand extends Window_Command {

//undefined
	initialize(x?, y?);
	static initCommandPosition();
	windowWidth();
	numVisibleRows();
	makeCommandList();
	addMainCommands();
	addFormationCommand();
	addOriginalCommands();
	addOptionsCommand();
	addSaveCommand();
	addGameEndCommand();
	needsCommand(name);
	areMainCommandsEnabled();
	isFormationEnabled();
	isOptionsEnabled();
	isSaveEnabled();
	isGameEndEnabled();
	processOk();
	selectLast();
}

//-----------------------------------------------------------------------------
// Window_MenuStatus
//
// The window for displaying party member status on the menu screen.
declare class Window_MenuStatus extends Window_Selectable {

//undefined
	initialize(x?, y?);
	windowWidth();
	windowHeight();
	maxItems();
	itemHeight();
	numVisibleRows();
	loadImages();
	drawItem(index);
	drawItemBackground(index);
	drawItemImage(index);
	drawItemStatus(index);
	processOk();
	isCurrentItemEnabled();
	selectLast();
	formationMode();
	setFormationMode(formationMode);
	pendingIndex();
	setPendingIndex(index);
}

//-----------------------------------------------------------------------------
// Window_MenuActor
//
// The window for selecting a target actor on the item and skill screens.
declare class Window_MenuActor extends Window_MenuStatus {
	initialize();
	processOk();
	selectLast();
	selectForItem(item);
}

//-----------------------------------------------------------------------------
// Window_ItemCategory
//
// The window for selecting a category of items on the item and shop screens.
declare class Window_ItemCategory extends Window_HorzCommand {
	initialize();
	windowWidth();
	maxCols();
	update();
	makeCommandList();
	setItemWindow(itemWindow);
}

//-----------------------------------------------------------------------------
// Window_ItemList
//
// The window for selecting an item on the item screen.
declare class Window_ItemList extends Window_Selectable {

//undefined
	initialize(x?, y?, width?, height?);
	setCategory(category);
	maxCols();
	spacing();
	maxItems();
	item();
	isCurrentItemEnabled();
	includes(item);
	needsNumber();
	isEnabled(item);
	makeItemList();
	selectLast();
	drawItem(index);
	numberWidth();
	drawItemNumber(item, x, y, width);
	updateHelp();
	refresh();
}

//-----------------------------------------------------------------------------
// Window_SkillType
//
// The window for selecting a skill type on the skill screen.
declare class Window_SkillType extends Window_Command {

//undefined
	initialize(x?, y?);
	windowWidth();
	setActor(actor);
	numVisibleRows();
	makeCommandList();
	update();
	setSkillWindow(skillWindow);
	selectLast();
}

//-----------------------------------------------------------------------------
// Window_SkillStatus
//
// The window for displaying the skill user's status on the skill screen.
declare class Window_SkillStatus extends Window_Base {

//undefined
	initialize(x?, y?, width?, height?);
	setActor(actor);
	refresh();
}

//-----------------------------------------------------------------------------
// Window_SkillList
//
// The window for selecting a skill on the skill screen.
declare class Window_SkillList extends Window_Selectable {

//undefined
	initialize(x?, y?, width?, height?);
	setActor(actor);
	setStypeId(stypeId);
	maxCols();
	spacing();
	maxItems();
	item();
	isCurrentItemEnabled();
	includes(item);
	isEnabled(item);
	makeItemList();
	selectLast();
	drawItem(index);
	costWidth();
	drawSkillCost(skill, x, y, width);
	updateHelp();
	refresh();
}

//-----------------------------------------------------------------------------
// Window_EquipStatus
//
// The window for displaying parameter changes on the equipment screen.
declare class Window_EquipStatus extends Window_Base {

//undefined
	initialize(x?, y?);
	windowWidth();
	windowHeight();
	numVisibleRows();
	setActor(actor);
	refresh();
	setTempActor(tempActor);
	drawItem(x, y, paramId);
	drawParamName(x, y, paramId);
	drawCurrentParam(x, y, paramId);
	drawRightArrow(x, y);
	drawNewParam(x, y, paramId);
}

//-----------------------------------------------------------------------------
// Window_EquipCommand
//
// The window for selecting a command on the equipment screen.
declare class Window_EquipCommand extends Window_HorzCommand {

//undefined
	initialize(x?, y?, width?);
	windowWidth();
	maxCols();
	makeCommandList();
}

//-----------------------------------------------------------------------------
// Window_EquipSlot
//
// The window for selecting an equipment slot on the equipment screen.
declare class Window_EquipSlot extends Window_Selectable {

//undefined
	initialize(x?, y?, width?, height?);
	setActor(actor);
	update();
	maxItems();
	item();
	drawItem(index);
	slotName(index);
	isEnabled(index);
	isCurrentItemEnabled();
	setStatusWindow(statusWindow);
	setItemWindow(itemWindow);
	updateHelp();
}

//-----------------------------------------------------------------------------
// Window_EquipItem
//
// The window for selecting an equipment item on the equipment screen.
declare class Window_EquipItem extends Window_ItemList {

//undefined
	initialize(x?, y?, width?, height?);
	setActor(actor);
	setSlotId(slotId);
	includes(item);
	isEnabled(item);
	selectLast();
	setStatusWindow(statusWindow);
	updateHelp();
	playOkSound();
}

//-----------------------------------------------------------------------------
// Window_Status
//
// The window for displaying full status on the status screen.
declare class Window_Status extends Window_Selectable {
	initialize();
	setActor(actor);
	refresh();
	drawBlock1(y);
	drawBlock2(y);
	drawBlock3(y);
	drawBlock4(y);
	drawHorzLine(y);
	lineColor();
	drawBasicInfo(x, y);
	drawParameters(x, y);
	drawExpInfo(x, y);
	drawEquipments(x, y);
	drawProfile(x, y);
	maxEquipmentLines();
}

//-----------------------------------------------------------------------------
// Window_Options
//
// The window for changing various settings on the options screen.
declare class Window_Options extends Window_Command {
	initialize();
	windowWidth();
	windowHeight();
	updatePlacement();
	makeCommandList();
	addGeneralOptions();
	addVolumeOptions();
	drawItem(index);
	statusWidth();
	statusText(index);
	isVolumeSymbol(symbol);
	booleanStatusText(value);
	volumeStatusText(value);
	processOk();
	cursorRight(wrap);
	cursorLeft(wrap);
	volumeOffset();
	changeValue(symbol, value);
	getConfigValue(symbol);
	setConfigValue(symbol, volume);
}

//-----------------------------------------------------------------------------
// Window_SavefileList
//
// The window for selecting a save file on the save and load screens.
declare class Window_SavefileList extends Window_Selectable {

//undefined
	initialize(x?, y?, width?, height?);
	setMode(mode);
	maxItems();
	maxVisibleItems();
	itemHeight();
	drawItem(index);
	drawFileId(id, x, y);
	drawContents(info, rect, valid);
	drawGameTitle(info, x, y, width);
	drawPartyCharacters(info, x, y);
	drawPlaytime(info, x, y, width);
	playOkSound();
}

//-----------------------------------------------------------------------------
// Window_ShopCommand
//
// The window for selecting buy/sell on the shop screen.
declare class Window_ShopCommand extends Window_HorzCommand {

//undefined
	initialize(width?, purchaseOnly?);
	windowWidth();
	maxCols();
	makeCommandList();
}

//-----------------------------------------------------------------------------
// Window_ShopBuy
//
// The window for selecting an item to buy on the shop screen.
declare class Window_ShopBuy extends Window_Selectable {

//undefined
	initialize(x?, y?, height?, shopGoods?);
	windowWidth();
	maxItems();
	item();
	setMoney(money);
	isCurrentItemEnabled();
	price(item);
	isEnabled(item);
	refresh();
	makeItemList();
	drawItem(index);
	setStatusWindow(statusWindow);
	updateHelp();
}

//-----------------------------------------------------------------------------
// Window_ShopSell
//
// The window for selecting an item to sell on the shop screen.
declare class Window_ShopSell extends Window_ItemList {

//undefined
	initialize(x?, y?, width?, height?);
	isEnabled(item);
}

//-----------------------------------------------------------------------------
// Window_ShopNumber
//
// The window for inputting quantity of items to buy or sell on the shop
// screen.
declare class Window_ShopNumber extends Window_Selectable {

//undefined
	initialize(x?, y?, height?);
	windowWidth();
	number();
	setup(item, max, price);
	setCurrencyUnit(currencyUnit);
	createButtons();
	placeButtons();
	updateButtonsVisiblity();
	showButtons();
	hideButtons();
	refresh();
	drawMultiplicationSign();
	drawNumber();
	drawTotalPrice();
	itemY();
	priceY();
	buttonY();
	cursorWidth();
	cursorX();
	maxDigits();
	update();
	isOkTriggered();
	playOkSound();
	processNumberChange();
	changeNumber(amount);
	updateCursor();
	onButtonUp();
	onButtonUp2();
	onButtonDown();
	onButtonDown2();
	onButtonOk();
}

//-----------------------------------------------------------------------------
// Window_ShopStatus
//
// The window for displaying number of items in possession and the actor's
// equipment on the shop screen.
declare class Window_ShopStatus extends Window_Base {

//undefined
	initialize(x?, y?, width?, height?);
	refresh();
	setItem(item);
	isEquipItem();
	drawPossession(x, y);
	drawEquipInfo(x, y);
	statusMembers();
	pageSize();
	maxPages();
	drawActorEquipInfo(x, y, actor);
	drawActorParamChange(x, y, actor, item1);
	paramId();
	currentEquippedItem(actor, etypeId);
	update();
	updatePage();
	isPageChangeEnabled();
	isPageChangeRequested();
	isTouchedInsideFrame();
	changePage();
}

//-----------------------------------------------------------------------------
// Window_NameEdit
//
// The window for editing an actor's name on the name input screen.
declare class Window_NameEdit extends Window_Base {

//undefined
	initialize(actor?, maxLength?);
	windowWidth();
	windowHeight();

//FIXME: name is a function here, but variable in parent class
	//name();
	restoreDefault();
	add(ch);
	back();
	faceWidth();
	charWidth();
	left();
	itemRect(index);
	underlineRect(index);
	underlineColor();
	drawUnderline(index);
	drawChar(index);
	refresh();
}

//-----------------------------------------------------------------------------
// Window_NameInput
//
// The window for selecting text characters on the name input screen.
declare class Window_NameInput extends Window_Selectable {

//undefined
	initialize(editWindow?);
	windowHeight();
	table();
	maxCols();
	maxItems();
	character();
	isPageChange();
	isOk();
	itemRect(index);
	refresh();
	updateCursor();
	isCursorMovable();
	cursorDown(wrap);
	cursorUp(wrap);
	cursorRight(wrap);
	cursorLeft(wrap);
	cursorPagedown();
	cursorPageup();
	processCursorMove();
	processHandling();
	isCancelEnabled();
	processCancel();
	processJump();
	processBack();
	processOk();
	onNameAdd();
	onNameOk();
}

//-----------------------------------------------------------------------------
// Window_ChoiceList
//
// The window used for the event command [Show Choices].
declare class Window_ChoiceList extends Window_Command {

//undefined
	initialize(messageWindow?);
	start();
	selectDefault();
	updatePlacement();
	updateBackground();
	windowWidth();
	numVisibleRows();
	maxChoiceWidth();
	textWidthEx(text);
	contentsHeight();
	makeCommandList();
	drawItem(index);
	isCancelEnabled();
	isOkTriggered();
	callOkHandler();
	callCancelHandler();
}

//-----------------------------------------------------------------------------
// Window_NumberInput
//
// The window used for the event command [Input Number].
declare class Window_NumberInput extends Window_Selectable {

//undefined
	initialize(messageWindow?);
	start();
	updatePlacement();
	windowWidth();
	windowHeight();
	maxCols();
	maxItems();
	spacing();
	itemWidth();
	createButtons();
	placeButtons();
	updateButtonsVisiblity();
	showButtons();
	hideButtons();
	buttonY();
	update();
	processDigitChange();
	changeDigit(up);
	isTouchOkEnabled();
	isOkEnabled();
	isCancelEnabled();
	isOkTriggered();
	processOk();
	drawItem(index);
	onButtonUp();
	onButtonDown();
	onButtonOk();
}

//-----------------------------------------------------------------------------
// Window_EventItem
//
// The window used for the event command [Select Item].
declare class Window_EventItem extends Window_ItemList {

//undefined
	initialize(messageWindow?);
	windowHeight();
	numVisibleRows();
	start();
	updatePlacement();
	includes(item);
	isEnabled(item);
	onOk();
	onCancel();
}

//-----------------------------------------------------------------------------
// Window_Message
//
// The window for displaying text messages.
declare class Window_Message extends Window_Base {
	initialize();
	initMembers();
	subWindows();
	createSubWindows();
	windowWidth();
	windowHeight();
	clearFlags();
	numVisibleRows();
	update();
	checkToNotClose();
	canStart();
	startMessage();
	updatePlacement();
	updateBackground();
	terminateMessage();
	updateWait();
	updateLoading();
	updateInput();
	isAnySubWindowActive();
	updateMessage();
	onEndOfText();
	startInput();
	isTriggered();
	doesContinue();
	areSettingsChanged();
	updateShowFast();
	newPage(textState);
	loadMessageFace();
	drawMessageFace();
	newLineX();
	processNewLine(textState);
	processNewPage(textState);
	isEndOfText(textState);
	needsNewPage(textState);
	processEscapeCharacter(code, textState);
	startWait(count);
	startPause();
}

//-----------------------------------------------------------------------------
// Window_ScrollText
//
// The window for displaying scrolling text. No frame is displayed, but it
// is handled as a window for convenience.
declare class Window_ScrollText extends Window_Base {
	initialize();
	update();
	startMessage();
	refresh();
	contentsHeight();
	updateMessage();
	scrollSpeed();
	isFastForward();
	fastForwardRate();
	terminateMessage();
}

//-----------------------------------------------------------------------------
// Window_MapName
//
// The window for displaying the map name on the map screen.
declare class Window_MapName extends Window_Base {
	initialize();
	windowWidth();
	windowHeight();
	update();
	updateFadeIn();
	updateFadeOut();
	open();
	close();
	refresh();
	drawBackground(x, y, width, height);
}

//-----------------------------------------------------------------------------
// Window_BattleLog
//
// The window for displaying battle progress. No frame is displayed, but it is
// handled as a window for convenience.
declare class Window_BattleLog extends Window_Selectable {
	initialize();
	setSpriteset(spriteset);
	windowWidth();
	windowHeight();
	maxLines();
	createBackBitmap();
	createBackSprite();
	numLines();
	messageSpeed();
	isBusy();
	update();
	updateWait();
	updateWaitCount();
	updateWaitMode();
	setWaitMode(waitMode);
	callNextMethod();
	isFastForward();
	push(methodName);
	clear();
	wait();
	waitForEffect();
	waitForMovement();
	addText(text);
	pushBaseLine();
	popBaseLine();
	waitForNewLine();
	popupDamage(target);
	performActionStart(subject, action);
	performAction(subject, action);
	performActionEnd(subject);
	performDamage(target);
	performMiss(target);
	performRecovery(target);
	performEvasion(target);
	performMagicEvasion(target);
	performCounter(target);
	performReflection(target);
	performSubstitute(substitute, target);
	performCollapse(target);
	showAnimation(subject, targets, animationId);
	showAttackAnimation(subject, targets);
	showActorAttackAnimation(subject, targets);
	showEnemyAttackAnimation(subject, targets);
	showNormalAnimation(targets, animationId, mirror);
	animationBaseDelay();
	animationNextDelay();
	refresh();
	drawBackground();
	backRect();
	backColor();
	backPaintOpacity();
	drawLineText(index);
	startTurn();
	startAction(subject, action, targets);
	endAction(subject);
	displayCurrentState(subject);
	displayRegeneration(subject);
	displayAction(subject, item);
	displayCounter(target);
	displayReflection(target);
	displaySubstitute(substitute, target);
	displayActionResults(subject, target);
	displayFailure(target);
	displayCritical(target);
	displayDamage(target);
	displayMiss(target);
	displayEvasion(target);
	displayHpDamage(target);
	displayMpDamage(target);
	displayTpDamage(target);
	displayAffectedStatus(target);
	displayAutoAffectedStatus(target);
	displayChangedStates(target);
	displayAddedStates(target);
	displayRemovedStates(target);
	displayChangedBuffs(target);
	displayBuffs(target, buffs, fmt);
	makeHpDamageText(target);
	makeMpDamageText(target);
	makeTpDamageText(target);
}

//-----------------------------------------------------------------------------
// Window_PartyCommand
//
// The window for selecting whether to fight or escape on the battle screen.
declare class Window_PartyCommand extends Window_Command {
	initialize();
	windowWidth();
	numVisibleRows();
	makeCommandList();
	setup();
}

//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.
declare class Window_ActorCommand extends Window_Command {
	initialize();
	windowWidth();
	numVisibleRows();
	makeCommandList();
	addAttackCommand();
	addSkillCommands();
	addGuardCommand();
	addItemCommand();
	setup(actor);
	processOk();
	selectLast();
}

//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.
declare class Window_BattleStatus extends Window_Selectable {
	initialize();
	windowWidth();
	windowHeight();
	numVisibleRows();
	maxItems();
	refresh();
	drawItem(index);
	basicAreaRect(index);
	gaugeAreaRect(index);
	gaugeAreaWidth();
	drawBasicArea(rect, actor);
	drawGaugeArea(rect, actor);
	drawGaugeAreaWithTp(rect, actor);
	drawGaugeAreaWithoutTp(rect, actor);
}

//-----------------------------------------------------------------------------
// Window_BattleActor
//
// The window for selecting a target actor on the battle screen.
declare class Window_BattleActor extends Window_BattleStatus {

//undefined
	initialize(x?, y?);
	show();
	hide();
	select(index);
	actor();
}

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// The window for selecting a target enemy on the battle screen.
declare class Window_BattleEnemy extends Window_Selectable {

//undefined
	initialize(x?, y?);
	windowWidth();
	windowHeight();
	numVisibleRows();
	maxCols();
	maxItems();
	enemy();
	enemyIndex();
	drawItem(index);
	show();
	hide();
	refresh();
	select(index);
}

//-----------------------------------------------------------------------------
// Window_BattleSkill
//
// The window for selecting a skill to use on the battle screen.
declare class Window_BattleSkill extends Window_SkillList {

//undefined
	initialize(x?, y?, width?, height?);
	show();
	hide();
}

//-----------------------------------------------------------------------------
// Window_BattleItem
//
// The window for selecting an item to use on the battle screen.
declare class Window_BattleItem extends Window_ItemList {

//undefined
	initialize(x?, y?, width?, height?);
	includes(item);
	show();
	hide();
}

//-----------------------------------------------------------------------------
// Window_TitleCommand
//
// The window for selecting New Game/Continue on the title screen.
declare class Window_TitleCommand extends Window_Command {
	initialize();
	static initCommandPosition();
	windowWidth();
	updatePlacement();
	makeCommandList();
	isContinueEnabled();
	processOk();
	selectLast();
}

//-----------------------------------------------------------------------------
// Window_GameEnd
//
// The window for selecting "Go to Title" on the game end screen.
declare class Window_GameEnd extends Window_Command {
	initialize();
	windowWidth();
	updatePlacement();
	makeCommandList();
}

//-----------------------------------------------------------------------------
// Window_DebugRange
//
// The window for selecting a block of switches/variables on the debug screen.
declare class Window_DebugRange extends Window_Selectable {

//undefined
	initialize(x?, y?);
	windowWidth();
	windowHeight();
	maxItems();
	update();
	mode();
	topId();
	refresh();
	drawItem(index);
	isCancelTriggered();
	processCancel();
	setEditWindow(editWindow);
}

//-----------------------------------------------------------------------------
// Window_DebugEdit
//
// The window for displaying switches and variables on the debug screen.
declare class Window_DebugEdit extends Window_Selectable {

//undefined
	initialize(x?, y?, width?);
	maxItems();
	refresh();
	drawItem(index);
	itemName(dataId);
	itemStatus(dataId);
	setMode(mode);
	setTopId(id);
	currentId();
	update();
	updateSwitch();
	updateVariable();
}

