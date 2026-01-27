from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def add_hyperlink(paragraph, url, text, color="0000FF", underline=True):
    part = paragraph.part
    r_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )

    # <w:hyperlink r:id="...">
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)

    # <w:r>
    new_run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")

    # Color
    color_el = OxmlElement("w:color")
    color_el.set(qn("w:val"), color)
    rPr.append(color_el)

    # Subrayado
    if underline:
        u = OxmlElement("w:u")
        u.set(qn("w:val"), "single")
        rPr.append(u)

    new_run.append(rPr)

    # Texto del enlace
    t = OxmlElement("w:t")
    t.text = text
    new_run.append(t)

    # Lo enganchamos todo
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)

    return paragraph