# FLOG


# TODO LIST:
TypeBar:

    if (price[0] === 0 && price[1] === 0) {
        filter.setPrice(null)
    } else {
        filter.setPrice(price)
    }

userControler

    const comms = await Comment.findAll(
        {where: {userId: id}}
    )

    if (comms) {
        for (const i of comms) {
            await i.destroy()
        }
    }
